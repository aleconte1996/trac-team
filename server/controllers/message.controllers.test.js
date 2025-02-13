//THIS FILE IS FOR TESTING PURPOSES using message.json as a mock db instead of employing mongo

import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

// having to do this to get file path and maintain my current import syntax
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// link to mock db
const messageFilePath = path.join(__dirname, "./message.json");

// reads "messages" in local db/message.json file
const readMessages = () => {
  const data = fs.readFileSync(messageFilePath);
  return JSON.parse(data);
};

// takes the raw json and adds it to the json file
const writeMessages = (messages) => {
  fs.writeFileSync(messageFilePath, JSON.stringify(messages, null, 2));
};

//CRUD functionality

//READ
// get all messages
router.get("/", (req, res) => {
  try {
    const messages = readMessages();
    res.json(messages);
  } catch (error) {
    res.json({ error: "Failed to read messages" });
  }
});

// get a single message by ID
router.get("/:id", (req, res) => {
  try {
    const messages = readMessages();
    const message = messages.find((msg) => msg.id === req.params.id);

    if (!message) return res.json({ error: "Message not found" });
    res.json(message);
  } catch (error) {
    res.json({ error: "Failed to get message" });
  }
});

//CREATE
// create a message
router.post("/", (req, res) => {
  try {
    const { user, room, body } = req.body;

    if (!user) return res.json({ error: "User is required" });
    if (!room) return res.json({ error: "Room is required" });
    if (!body) return res.json({ error: "Text content is required" });

    const messages = readMessages();
    const newMessage = {
      id: String(Date.now()), // Generate a unique ID
      user,
      room,
      body,
      when: new Date().toISOString(),
    };

    messages.push(newMessage);
    writeMessages(messages);

    res.json(newMessage);
  } catch (error) {
    res.json({ error: "Failed to create message" });
  }
});

//UPDATE
// update a message
router.put("/:id", (req, res) => {
  try {
    const { user, room, body } = req.body;
    const { id } = req.params;

    if (!user) return res.json({ error: "User is required" });
    if (!room) return res.json({ error: "Room is required" });
    if (!body) return res.json({ error: "Text content is required" });

    let messages = readMessages();
    const messageIndex = messages.findIndex((msg) => msg.id === id);

    if (messageIndex === -1) return res.json({ error: "Message not found" });

    messages[messageIndex] = { ...messages[messageIndex], user, room, body };
    writeMessages(messages);

    res.json(messages[messageIndex]);
  } catch (error) {
    res.json({ error: "Failed to update message" });
  }
});

//delete
// delete a message
router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    let messages = readMessages();

    const newMessages = messages.filter((msg) => msg.id !== id);
    if (newMessages.length === messages.length) {
      return res.json({ error: "Message not found." });
    }

    writeMessages(newMessages);
    res.json({ message: "Message deleted" });
  } catch (error) {
    res.json({ error: "Failed to delete message" });
  }
});

export default router;

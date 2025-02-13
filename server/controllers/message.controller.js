import express from "express";
import Message from "../models/message.models.js";
//const fs = require('fs')

const router = express.Router();

//read ALL
router.get("/", async (req, res) => {
  try {
    const messages = await messagePath.find();
    res.json(messages);
  } catch (error) {
    res.json({ error: "Failed to read messages" });
  }
});

//read single message by id
router.get("/:id", async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.json({ error: "Message not found" });
    res.json(message);
  } catch (error) {
    res.json({ error: "Failed to get message" });
  }
});

//create
router.post("/", async (req, res) => {
  try {
    const { user, room, body } = req.body;

    if (!user) return res.json({ error: "User is required" });
    if (!room) return res.json({ error: "Room is required" });
    if (!body) return res.json({ error: "Text content is required" });

    //timestamp on messages. ID is automatically assigned when using mongo
    const newMessage = new Message({
      user,
      room,
      body,
      when: new Date().toISOString(), // Ensure timestamp consistency
    });
    const savedMessage = await newMessage.save();
    res.json(savedMessage);

  } catch (error) {
    console.error("Error creating message:", error);
    res.json({ error: "Failed to create message" });
  }
});

//update
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { user, room, body } = req.body;

    if (!user) return res.json({ error: "User is required" });
    if (!room) return res.json({ error: "Room is required" });
    if (!body) return res.json({ error: "Text content is required" });

    const updatedMessage = await Message.findByIdAndUpdate(
      id,
      { user, room, body },
      { new: true }
    );

    if (!updatedMessage) return res.json({ error: "Message not found" });

    res.json(updatedMessage);
  } catch (err) {
    res.json({ error: "Failed to update message" });
  }
});

//delete
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMessage = await Message.findByIdAndDelete(id);
    if (!deletedMessage) return res.json({ error: "Message not found." });

    res.json({ message: "Message deleted" });
  } catch (err) {
    res.json({ error: "Failed to delete message" });
  }
});

export default router;

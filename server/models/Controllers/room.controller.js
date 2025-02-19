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
const Room = path.join(__dirname, "../room.json");

//endpoint: localhost:3000/rooms/all
// request type: GET description: return all rooms

router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json({
      message: "rooms retrieved sucessfully",
      rooms: rooms,
    });
  } catch (error) {
    res.status(500).json({
      message: "error",
      errorMessage: error.message,
    });
  }
});

//endpoint: localhost3000/rooms/add
//request type: POST
//description: adds a new room to the database
router.post("add", async (req, res) => {
  try {
    const { name, description, addedUsers } = req.body;
    const newRoom = new Room({
      name,
      description,
      addedUsers: addedUsers || [],
    });

    const savedRoom = await newRoom.save();
    res.json({
      message: "room added sucessfully",
      room: savedRoom,
    });
  } catch (error) {
    res.status(500).json({
      message: "error",
      errorMessage: error.message,
    });
  }
});

//endpoint: localhost:3000/rooms:id
//request type: Get
// description: returns a room by id

router.get("/:id", async (req, res) => {
  try {
    const room = await room.findById(req, params.id);
    if (!room) {
      throw new Error("Room not found");
    }
    res.json({
      messsage: "room found sucessfully",
      room: room,
    });
  } catch (error) {
    res.status(500).json({
      message: "error",
      errorMessage: error.message,
    });
  }
});

//endpoint: localhost:3000/rooms/delete/:id
// request type: DELETE
//description: deletes a room by id

router.delete("delete/:id", async (req, res) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);
    if (!deletedRoom) {
      throw new Error("room not found");
    }
    res.json({
      message: "room deleted sucessfully",
      room: deletedroom,
    });
  } catch (error) {
    res.status(500).json({
      message: "error",
      errorMessage: error.message,
    });
  }
});

//endpoint: localhost:3000/rooms/update/:id
//request type: PUT
// description : updates a room by id

router.put("/update/:id", async (req, res) => {
  try {
    const { name, description, addedUsers } = req.body;
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { name, description, addedUsers },
      { new: true } //returns updated doc
    );
    if (!updatedRoom) {
      throw new Error("Room not found");
    }
    res.json({
      message: "Room updated sucessfully",
      room: updatedRoom,
    });
  } catch (error) {
    res.status(500).json({
      message: "error",
      errorMessage: error.message,
    });
  }
});

export default router;

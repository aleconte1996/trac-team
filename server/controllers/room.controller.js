import express from 'express';
import Room from '../models/room.models.js';
import { checkAdmin } from '../middleware/checkAdmin.js';

const router = express.Router();

// Create room endpoint
// http://localhost:3000/api/rooms
router.post('/', async (req, res) => {  // Create a new room
  try {
    const { name, description, addedUsers } = req.body; // Get the name, description, and addedUsers from the request body  
    const room = new Room({ name, description, addedUsers }); // Create a new room with the name, description, and addedUsers fields
    await room.save();  // Save the room to the database  
    res.status(201).json({ message: 'Room created successfully' }); // Return a success message
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Display all rooms endpoint
// http://localhost:3000/api/rooms
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find();  // Find all rooms in the database
    res.json(rooms);  // Return the rooms
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update room endpoint
// http://localhost:3000/api/rooms/"id"
router.put('/:id', checkAdmin ,async (req, res) => {
  try {
    const { name, description, addedUsers } = req.body; // Get the name, description, and addedUsers from the request body
    const room = await Room.findByIdAndUpdate(  // Find the room by ID and update the name, description, and addedUsers fields
      req.params.id,  // ID of the room to update
      { name, description, addedUsers },  // New name, description, and addedUsers
      { new: true } // Return the updated room
    );
    if (!room) {  // If the room is not found
      return res.status(404).json({ error: 'Room not found' }); // Return an error message
    }
    res.json({ message: 'Room updated successfully', room });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete room endpoint
// http://localhost:3000/api/rooms/"id"
router.delete('/:id',checkAdmin, async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id); // Find the room by ID and delete it from the database
    if (!room) {
      return res.status(404).json({ error: 'Room not found' }); 
    }
    res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
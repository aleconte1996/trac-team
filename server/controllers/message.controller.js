import express from 'express';
import Message from '../models/message.models.js';

const router = express.Router();

// Display all messages within a room endpoint
// http://localhost:3000/api/messages/:roomId
router.get('/:roomId', async (req, res) => {
  try {
    const messages = await Message.find({ room: req.params.roomId }).populate('user', 'firstName lastName');  // Find all messages in the room and populate the user field with the first and last name
    res.json(messages); // Return the messages
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Create a message within a room endpoint
// http://localhost:3000/api/messages/:roomId
router.post('/', async (req, res) => {
  try {
    const { user, body } = req.body;  // Get the user and body from the request body
    const message = new Message({ user, room: req.params.roomId, body }); // Create a new message with the user, room, and body fields  
    await message.save(); // Save the message to the database 
    res.status(201).json({ message: 'Message created successfully' });  // Return a success message 
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a message within a room endpoint
// http://localhost:3000/api/messages/:messageId
router.put('/:messageId', async (req, res) => {
  try {
    const { body } = req.body;  // Get the body from the request body 
    const message = await Message.findByIdAndUpdate(req.params.messageId, { body }, { new: true }); // Find the message by ID and update the body field 
    if (!message) { // If the message is not found
      return res.status(404).json({ error: 'Message not found' });
    }
    res.json({ message: 'Message updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a message within a room endpoint
// http://localhost:3000/api/messages/:messageId
router.delete('/:messageId', async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.messageId);  // Find the message by ID and delete it from the database
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// get all messages
// http://localhost:3000/api/messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().populate('user', 'firstName lastName'); // Find all messages and populate the user field with the first and last name
    res.json(messages); // Return the messages
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
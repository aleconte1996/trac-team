import express from 'express';// Import the express module
import User from '../models/user.models.js';  // Import the User model
import dotenv from 'dotenv';  
import bcrypt from 'bcrypt'; // Import the bcrypt module  
import jwt from 'jsonwebtoken'; // Import the jsonwebtoken module 

dotenv.config();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Set the JWT secret


// Create a new user
// http://localhost:3000/api/users/register
router.post('/register', async (req, res) => {  
  try {
    const { firstName, lastName, email, password, role } = req.body;  // Get the first name, last name, email, password, and role from the request body 
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password  
    const user = new User({ firstName, lastName, email, password: hashedPassword, role });  // Create a new user with the first name, last name, email, password, and role fields
    await user.save();  // Save the user to the database
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body; // Get the email and password from the request body
    const user = await User.findOne({ email }); // Find the user by email
    if (!user) {  // If the user is not found
      return res.status(400).json({ error: 'Invalid email' });  // Return an error message
    }
    const isMatch = await bcrypt.compare(password, user.password);  // Compare the password with the hashed password
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid password' });
    }
    console.log('User role:', user.role); // Debugging: Log the user role
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' }); // Generate a JWT token with the user ID and role
    console.log('Generated token:', token); // Debugging: Log the generated token
    res.json({ message: 'Login successful', token }); // Return the token
  } catch (error) {
    res.status(400).json({ error: error.message }); // Return an error message
  }
});

// Update user endpoint
// http://localhost:3000/api/users/"id"
router.put('/:id', async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;  // Get the first name, last name, email, password, and role from the request body
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const user = await User.findByIdAndUpdate(  // Find the user by ID and update the first name, last name, email, password, and role fields
      req.params.id,  // ID of the user to update
      { firstName, lastName, email, password: hashedPassword, role }, // New first name, last name, email, password, and role
      { new: true } // Return the updated user
    );
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User updated successfully', user }); // Return a success message
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete user endpoint
// http://localhost:3000/api/users/"id"
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id); // Find the user by ID and delete it from the database
    if (!user) {  
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Display all users endpoint
// http://localhost:3000/api/users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();  // Find all users in the database
    res.json(users);  // Return the users
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
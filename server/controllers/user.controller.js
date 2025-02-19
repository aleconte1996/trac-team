import express from 'express';
import User from '../models/user.models.js';

const router = express.Router();

// Create user endpoint
// http://localhost:3000/api/users/register
router.post('/register', async (req, res) => {
  
  try {
    const { firstName, lastName, email, password } = req.body;// destructure the request body
    const user = new User({ firstName, lastName, email, password });// create a new user
    await user.save(); // save the user
    res.status(201).json({ message: 'User created successfully' });// return a response
  } catch (error) {
    res.status(400).json({ error: error.message }); // return an error message
  }
});

// Login user endpoint
// http://localhost:3000/api/users/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body; // destructure the request body
    const user = await User.findOne({ email, password }); // find a user by email and password
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });  // return an error message
    }
    res.json({ message: 'Login successful', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update user endpoint
// http://localhost:3000/api/users/"id"
router.put('/:id', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;  // destructure the request body
    const user = await User.findByIdAndUpdate(  // find a user by id and update
      req.params.id,  // get the user id from the request parameters
      { firstName, lastName, email, password }, // update the user
      { new: true } // return the updated user
    );
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete user endpoint
// http://localhost:3000/api/users/"id"
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id); // find a user by id and delete
    if (!user) {  // if user is not found
      return res.status(404).json({ error: 'User not found' }); // return an error message
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// Display all users endpoint
// http://localhost:3000/api/users/
router.get('/', async (req, res) => {
  try {
    const users = await User.find();  // find all users
    res.json(users);  // return the users
  } catch (error) {
    res.status(400).json({ error: error.message }); 
  }
});

export default router;
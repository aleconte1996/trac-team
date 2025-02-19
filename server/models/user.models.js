import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },  // First name of the user must be string and required
  lastName: { type: String, required: true }, // Last name of the user must be string and required
  email: { type: String, required: true, unique: true },  // Email of the user must be string and required and unique
  password: { type: String, required: true },  // Password of the user must be string and required
  role: { type: String, enum: ['user', 'admin'], default: 'user' } // Add role field with default value 'user' 
});

const User = mongoose.model('User', userSchema);

export default User;
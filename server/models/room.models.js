import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({  // Defining the schema for the rooms
  name: { type: String, required: true, unique: true }, // Name of the room must be string and required and unique
  description: { type: String, required: true },  // Description of the room must be string and required
  addedUsers: [{ type: String }]    //addedUsers is an array of strings
});

const Room = mongoose.model('Room', roomSchema);  // Creating a model for the rooms

export default Room;  // Exporting the model for use in other files
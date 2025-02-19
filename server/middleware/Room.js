import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  addedUsers: [{ type: String }] // Accept strings instead of ObjectIds
});

const Room = mongoose.models.Room || mongoose.model('Room', roomSchema);

export default Room;
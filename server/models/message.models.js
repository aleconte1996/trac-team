import mongoose from "mongoose";  // Importing mongoose for MongoDB connection

const messageSchema = new mongoose.Schema({ // Defining the schema for the messages
  when: { type: Date, default: Date.now },  // Date and time of the message
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },  // User who sent the message
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: false }, // Room in which the message was sent
  user: { type: String, required: true }, // User who sent the message
  body: { type: String, required: true }, // Message body
});


const Message = mongoose.model("Message", messageSchema); // Creating a model for the messages



export default Message; // Exporting the model for use in other files


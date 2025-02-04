import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  when: { type: Date, default: Date.now },
  //user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }//,
  //room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  body: { type: String, required: true },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;

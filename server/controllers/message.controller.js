import express from "express";
import Message from "../models/message.models.js";

const router = express.Router();

//read
router.get("/", async (req, res) => {
 try {
   const messages = await Message.find(); //{ room: req.params.roomId }).populate("user","firstName lastName");
   res.json(messages);
 } catch (error) {
   res.json({ error: "ERROR" });
 }
});

//create
router.post("/", async (req, res) => {
  try {
    const { user, room, body } = req.body;

   // if (!user) return res.json({ error: "User is required" });
   // if (!room) return res.json({ error: "Room is required" });
    if (!body) return res.json({ error: "Message body is required" });

    const newMessage = new Message({ body });//{ user, room, body });
    await newMessage.save();
    res.json(newMessage);
  } catch (err) {
    res.json({ error: "Failed to create a message" });
  }
});

//update
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { user, room, body } = req.body;

    //if (!user) return res.json({ error: "User is required" });
    //if (!room) return res.json({ error: "Room is required" });
    if (!body) return res.json({ error: "Text content is required" });

    const updatedMessage = await Message.findByIdAndUpdate(
      id,
      { body } ,  //{ user, room, body },
      { new: true }
    );

    if (!updatedMessage) return res.json({ error: "Message not found" });

    res.json(updatedMessage);
  } catch (err) {
    res.json({ error: "Failed to update message" });
  }
});



//delete
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMessage = await Message.findByIdAndDelete(id);
    if (!deletedMessage) return res.json({ error: "Message not found." });

    res.json({ message: "Message deleted" });
  } catch (err) {
    res.json({ error: "Failed to delete message" });
  }
});


export default router;

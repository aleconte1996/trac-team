// Importing required modules
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose"; // Importing mongoose for MongoDB connection
import messageRoutes from "./controllers/message.controller.js"

dotenv.config(); // Initialize dotenv to use environment variables

const app = express(); // express app instance
const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware to parse JSON requests
app.use(express.json());

//routes
app.use('/messages', messageRoutes);






app.listen(PORT, () => console.log(`Listening On PORT ${PORT}`));
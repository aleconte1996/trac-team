// Importing required modules
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose"; // Importing mongoose for MongoDB connection
import userRoutes from "./controllers/user.controller.js";  
import roomRoutes from "./controllers/room.controller.js";
import messageRoutes from "./controllers/message.controller.js";

dotenv.config(); // Initialize dotenv to use environment variables

const app = express(); // express app instance
const PORT = process.env.PORT ||3000; // Port at which the server will run

mongoose
  .connect(process.env.MONGODB_URI) // Connecting to MongoDB throw the URI from the .env file
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  }); 

// Middleware to parse JSON requests
app.use(express.json());  

//routes
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/rooms", roomRoutes);

app.listen(PORT, () => console.log(`Listening On PORT ${PORT}`));

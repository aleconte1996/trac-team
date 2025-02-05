const router = require("express").Router();
const Room = require("room.models");


//endpoint: localhost:3000/rooms/all
// request type: GET description: return all rooms

router.get("/all",async(req, res) => {
    try{
        const rooms = await Room.find();
        res.json({
            message: "rooms retrieved sucessfully",
            rooms: rooms });
    } catch (error) {
        res.status(500).json({
            message: "error",
            errorMessage: error.message
        });
    }
});


//endpoint: localhost3000/rooms/add
//request type: POST 
//description: adds a new room to the database 
router.post("add", async(req, res) => {
    try {
        const { name,description, addedUsers} = req.body;
        const newRoom = new Room({
            name,
            description,
            addedUsers: addedUsers || []
        });

        const savedRoom = await newRoom.save();
        res.json({
            message: "room added sucessfully",
            room: savedRoom
        });
    } catch (error){
        res.status(500).json({
            message: "error",
            errorMessage: error.message
        });
    }
});


//endpoint: localhost:3000/rooms:id
//request type: Get
// description: returns a room by id 

router.get()
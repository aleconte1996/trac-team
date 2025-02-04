const mongoose = require(`mongoose`);

const roomSchema = new mongoose.schema(
    {
        name: {
            type: String,
            required: true,
            unique: true 
        },
        description: 
        {
            type: String,
            required: true
        },
        addedUsers: [{
            typer: String
        }]
    }, 
    {
        timestamps: true
    }
);

module.exports = mongoose.model(`Room`, roomSchema);
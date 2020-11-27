import { Schema, model } from 'mongoose';

const roomsSchema = new Schema (
    {
        Name: String,
        Capacity: Number,
        Description: String,
    },
    {
        timestamp:true,
    },
);

export default model('Rooms', roomsSchema);
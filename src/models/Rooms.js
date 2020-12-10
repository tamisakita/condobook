import { Schema, model } from 'mongoose';

const roomsSchema = new Schema (
    {
        name: String,
        capacity:{ type: Number, required: true, min: 1},
        description: String,
    },
    {
        timestamp:true,
    },
);

export default model('Rooms', roomsSchema);
import { Schema, model } from 'mongoose';

const roomsSchema = new Schema (
    {
        name: String,
        capacity: Number,
        description: String,
        bookings: [{ type:Schema.Types.ObjectId, ref: 'Bookings'}],
    },
    {
        timestamp:true,
    },
);

export default model('Rooms', roomsSchema);
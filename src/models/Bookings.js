import { Schema, model } from 'mongoose';

const bookingsSchema = new Schema(
    {
        room: String,
        bookingstart:Date,
        bookingend: Date,
        owner: [{ type: Schema.Types.ObjectId, ref: 'Residents' }],
    },
    {
        timestamps: true,
    },

);
  
  export default model('Bookings', bookingsSchema);
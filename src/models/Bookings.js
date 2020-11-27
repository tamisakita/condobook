import { Schema, model } from 'mongoose';

import ApplicationError from '../errors/ApplicationError';

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
bookingsSchema.statics.validateUpdateParams = (req, res, next) => {
    if (req.body.title) {
      return next();
    }
  
    throw new ApplicationError({ message: 'error in this booking schema', status: 401 });
  };
  
  export default model('Bookings', bookingstSchema);
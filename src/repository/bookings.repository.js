import Bookings from '../models/Bookings';

import ApplicationError from '../errors/ApplicationError'

class BookingsRepository {
    constructor(BookingsModel) {
      this.Bookings = BookingsModel;
    }


//List all the bookings from the date of acesss + 7 days per user

async get(id) {
  try {
    
    const today = new Date();

    const bookingslistPerUser = await this.Bookings.find({owner: id,bookingstart: { $gt: today }});

    return bookingslistPerUser;
  } catch (error) {
    throw new ApplicationError();
  }
}

//List all the bookings from the date of acesss + 7 days per user

async get(roomName) {
  try {
    
    const today = new Date();

    const bookingslistPerRoom = await this.Bookings.find({room:roomName,bookingstart: { $gt: today }});

    return bookingslistPerRoom;
  } catch (error) {
    throw new ApplicationError();
  }
}

//Create: saving the information from new booking on the db
    async create(newBooking,id) {
    try {
      
      const booking = new this.Bookings({ ...newBooking, owner: id });

      await booking.save();

    } catch (error) {
      throw new ApplicationError(
        {
          message: 'Error while performing an database operation',
          type: 'BookingsRepository - create method',
          status: 409,
        },
      );
    }
}

//Update: updating information of bookings on the db
async updateOne(updateObject, id) {
  const updatedBooking = await this.Bookings.findByIdAndUpdate(
    id,
    updateObject,
    { new: true, useFindAndModify: false },
  );

  return updatedBooking;
}

//Delete: deleting bookings from de db
async deleteOne(id) {
  await this.Bookings.findByIdAndDelete(id);
} 

}
export default new BookingsRepository(Bookings);




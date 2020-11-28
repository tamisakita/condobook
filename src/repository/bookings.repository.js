import Bookings from '../models/Bookings';

import ApplicationError from '../errors/ApplicationError'

class BookingsRepository {
    constructor(BookingsModel) {
      this.Bookings = BookingsModel;
    }


//List all the bookings from the date of acesss + 7 days

async get() {
  try {
    
    const today = new Date();

    const bookingslist = await this.Bookings.find({bookingstart: { $gt: today }});

    return bookingslist;
  } catch (error) {
    throw new ApplicationError();
  }
}

//Create: saving the information from new booking on the db
    async create(newBooking, id) {
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
  const updatedBookings = await this.Bookings.findByIdAndUpdate(
    id,
    updateObject,
    { new: true, useFindAndModify: false },
  );

  return updatedBookings;
}

//Delete: deleting bookings from de db
async deleteOne(id) {
  await this.Project.findByIdAndDelete(id);
} 

}
export default new BookingsRepository(Bookings);




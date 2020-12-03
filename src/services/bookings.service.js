import BookingsRepository from '../repository/bookings.repository';

import ApplicationError from '../errors/ApplicationError';

import Bookings from '../models/Bookings';

//import Rooms from '../models/Rooms';

class BookingsService {
    constructor(bookingsRepo) {
        this.BookingsRepository = bookingsRepo;
    }

//listar os bookings do dia de hoje
    async get() {
        try {
          const bookingsFromDb = await this.BookingsRepository.get();
    
          return bookingsFromDb;
        } catch (error) {
          throw new ApplicationError({ message: error.message, type: 'Bookings - Get Method', status: 502 });
        }
      }

//criar um novo booking      
    async create(newBooking, id) {
      const numberOfBookings = Bookings.filter(function(booking){
        if (booking.bookingstart === newBooking.bookingstart && booking.room === newBooking.room) {
          return true;
        } else {
          return false;
        }
      }).length;

      if (numberOfBookings < Rooms.capacity) { // investigar a melhor forma de fazer essa comparação
        await this.bookingsRepository.create(newBooking, id);
      } else{
        throw new ApplicationError({ message: error.message, status: 504 });
      }  
  }   


//update um booking
async updateOne(updateObject, id) {
  try {
    const updatedBooking = await this.BookingsRepository.updateOne(updateObject, id);

    return updatedBooking;
  } catch (error) {
    throw new ApplicationError({ message: error.message, status: 504 });
  }
}

//deletar um booking
async deleteOne(id) {
  await this.BookingsRepository.deleteOne(id);
}
}
export default new BookingsService(BookingsRepository);
import BookingsRepository from '../repository/bookings.repository';

import ApplicationError from '../errors/ApplicationError';

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
        await this.bookingsRepository.create(newBooking, id);
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
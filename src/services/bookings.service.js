import BookingsRepository from '../repository/bookings.repository';

import ApplicationError from '../errors/ApplicationError';

import RoomsRepository from '../repository/rooms.repository';

class BookingsService {
    constructor(bookingsRepo,roomsRepo) {
        this.BookingsRepository = bookingsRepo;
        this.RoomsRepository = roomsRepo;
    }

//listar os bookings do dia de hoje per user
    async get(id) {
        try {
          const bookingsFromDbPerUser = await this.BookingsRepository.get(id);
    
          return bookingsFromDbPerUser;
        } catch (error) {
          throw new ApplicationError({ message: error.message, type: 'Bookings - Get Method', status: 502 });
        }
      }

//listar os bookings do dia de hoje per room
    async get(roomName) {
      try {
        const bookingsFromDbPerRoom = await this.BookingsRepository.get(roomName);

        return bookingsFromDbPerRoom;
      } catch (error) {
        throw new ApplicationError({ message: error.message, type: 'Bookings - Get Method', status: 502 });
    } 
  }

//criar um novo booking      
    async create(newBooking,id) {
      const allBookings = await this.BookingsRepository.get();
      const numberOfBookings = allBookings.filter(function(booking){
        if (booking.bookingstart === newBooking.bookingstart && booking.room === newBooking.room) {
          return true;
        } else {
          return false;
        }
      }).length;

      const allRooms = await this.RoomsRepository.get();
      const nbRoom = allRooms.filter((room)=> {
        return room.name.includes(newBooking.room)
      });

      if (numberOfBookings < nbRoom[0].capacity) { 
        await this.BookingsRepository.create(newBooking,id);
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
export default new BookingsService(BookingsRepository, RoomsRepository);
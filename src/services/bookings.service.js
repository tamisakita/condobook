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
    async create(newProject, id) {
        await this.projectRepository.create(newProject, id);
      }   
}

export default new BookingsService(BookingsRepository);
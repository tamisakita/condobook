import roomsRepository from '../repository/rooms.repository';

import ApplicationError from '../errors/ApplicationError'

class RoomService{
    constructor(roomsRepo) {
        this.roomsRepository = roomsRepo;
    }

    async get() {
        try {
          const roomsFromDb = await this.roomsRepository.get();
    
          return roomsFromDb;
        } catch (error) {
          throw new ApplicationError({ message: error.message, type: 'Projects - Get Method', status: 502 });
        }
      }

    async create(newRoomInfo) {
        await this.roomsRepository.create(newRoomInfo);
    }

    async deleteOne(id) {
        await this.roomsRepository.deleteOne(id);
      }
}

export default new RoomService(roomsRepository);
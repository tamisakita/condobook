import Rooms from '../models/Rooms';

import ApplicationError from '../errors/ApplicationError';

class RoomsRepository{
    constructor(RoomModel) {
        this.Rooms = RoomModel;
    }
    
    async get() {
        try {
      
          const roomslist = await this.Rooms.find();
      
          return roomslist;
        } catch (error) {
          throw new ApplicationError();
        }
      }
      

    async create(newRoomInfo) {
      try {
        const room = new this.Rooms({ ...newRoomInfo});
    
          await room.save();
      } catch (error) {
        throw new ApplicationError(
          {
            message: 'Error while performing an database operation',
            type: 'ProjectRepository - create method',
            status: 409,
          },
        );
      }
    }
    async deleteOne(id) {
        await this.Rooms.findByIdAndDelete(id);
      }

      async addBookingToRoom({ roomId, bookingId }) {
        await this.Rooms.findByIdAndUpdate(
          roomId,
          { $push: { bookings: bookingId } },
          { useFindAndModify: false },
        );
      }
    
      async removeBookingfromRoom(roomId, bookingId) {
        await this.Project.findByIdAndUpdate(
            roomId,
          { $pull: { bookings: bookingId } },
          { useFindAndModify: false },
        );
      }
}

export default new RoomsRepository(Rooms);
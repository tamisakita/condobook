import { Router } from 'express';

import BookingsService from '../../../services/bookings.service';

import ApplicationError from '../../../errors/ApplicationError';

const router = Router();

//route to list the bookings done "today" per user
router.get('/bookingslist/:id', async(req, res, next) =>{
  try {

    const { id } = req.params;

    const bookingsListPerUser = await BookingsService.get(id);

    return res.status(200).json(bookingsListPerUser);

  } catch (error) {
    return next(new ApplicationError(error));
  }
});

//route to list the bookings done "today" per room
router.get('/bookingslist/:id', async(req, res, next) =>{
  try {
    const { roomName } = req.params;

    const bookingsListPerRoom = await BookingsService.get(roomName);

    return res.status(200).json(bookingsListPerRoom);

  } catch (error) {
    return next(new ApplicationError(error));
  }
});

 //route to create new booking - linking with bookingsService
router.post('/createbooking', async (req, res, next) => {
    try {
      //const { id } = req.user;
      const newBooking = req.body;
  
      await BookingsService.create(newBooking);
  
      return res.status(201).json({ message: 'Booking created' });
    } catch (error) {
      return next(new ApplicationError(error));
    }
  });

//route to update booking - linking with bookingsService
router.put('/update/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const updateObject  = req.body;

    const updatedBooking = await BookingsService.updateOne(updateObject, id);

    return res.status(200).json(updatedBooking);
  } catch (error) {
    return next(new ApplicationError(error));
  }
});


//route to delete a booking - linking with bookingService
router.delete('/delete/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    await BookingsService.deleteOne(id);

    return res.status(200).json();
  } catch (error) {
    return next(new ApplicationError(error));
  }
});

export default router;
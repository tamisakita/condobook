import { Router } from 'express';

/* import Bookings from '../../../models/Bookings'; */

import BookingsService from '../../../services/bookings.service';

import ApplicationError from '../../../errors/ApplicationError';

const router = Router();

//route to list the bookings done "today"
router.get('/bookingslist', async(req, res, next) =>{
  try {

    const bookingsList = await BookingsService.get();

    return res.status(200).json(bookingsList);

  } catch (error) {
    return next(new ApplicationError(error));
  }
});

 //route to create new booking - linking with bookingsService
router.post('/createbooking', async (req, res, next) => {
    try {
      const { id } = req.user;
      const newBooking = req.body;
  
      await BookingsService.create(newBooking, id);
  
      return res.status(201).json();
    } catch (error) {
      return next(new ApplicationError(error));
    }
  });

//route to update booking - linking with bookingsService

export default router;
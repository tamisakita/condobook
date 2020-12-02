import { Router } from 'express';

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
import { Router } from 'express';

import residentsService from '../../../services/residents.service';

import ApplicantionError from '../../../errors/ApplicationError';
import ApplicationError from '../../../errors/ApplicationError';

const router = Router();

//validação 
const validateBodyRequest = (req, res, next) => {
  if (!req.body.email) {
    throw new ApplicationError({ message: 'email required', status: 400 })
  }

  next();
};

router.post('/register', validateBodyRequest, async (req, res, next) => {
  try {
    const { body } = req;

    await residentsService.register(body);

    return res.status(201).json({ message: 'Resident created' });
  } catch (error) {
    return next(new ApplicantionError(error));
  }
});

export default router;


import { Router } from 'express';

import ResidentEntity from '../../../models/Residents'
import residentsService from '../../../services/residents.service';
import ApplicantionError from '../../../errors/ApplicationError';

const router = Router();

router.post('/register', ResidentEntity.validateRegisterParams , async (req, res, next) => {
  try {
    const { body } = req;

    await residentsService.register(body);

    return res.status(201).json({ message: 'Resident created' });
  } catch (error) {
    return next(new ApplicantionError(error));
  }
});

export default router;


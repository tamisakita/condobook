import { Router } from 'express';

import ResidentEntity from '../../../models/Residents'
import residentsService from '../../../services/residents.service';
import ApplicantionError from '../../../errors/ApplicationError';
import Residents from '../../../models/Residents';

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

router.get('/list', async (req, res, next) => {
  try {
    const residents = residentsService.get();

    return res.status(200).json(residents);
  } catch (error) {
    return next(new ApplicantionError(error))
  }
})

//router para editar

//router para deletar

export default router;


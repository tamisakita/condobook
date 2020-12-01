import { Router } from 'express';

import ResidentEntity from '../../../models/Residents';
import authService from '../../../services/auth.service';
import ApplicationError from '../../../errors/ApplicationError';

const router = Router();

router.post('/login', ResidentEntity.validateLoginParams, async (req, res, next) => {
  try {
    const { body } = req;

    const loggedToken = await authService.authenticateResident(body);

    return res.status(200).json({ token: loggedToken });
  } catch (error) {
    return next(new ApplicationError(error));
  }
});

export default router;
import { Router } from 'express';

import bookingsPrivateRoute from './private/routes';

const router = Router();

router.use('/private', bookingsPrivateRoute);

export default router;
import { Router } from 'express';

import roomsPrivateRoutes from './private/routes';

const router = Router();

router.use('/private', roomsPrivateRoutes);

export default router;

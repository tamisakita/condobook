import { Router } from 'express';

import residentsPrivateRoutes from './private/routes.js'

const router = Router();

router.use('/private', residentsPrivateRoutes);

export default router;
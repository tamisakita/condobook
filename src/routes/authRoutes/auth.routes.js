import { Router } from 'express';

import authPublicRoutes from './public/routes.js';

const router = Router();

router.use('/public', authPublicRoutes);

export default router;
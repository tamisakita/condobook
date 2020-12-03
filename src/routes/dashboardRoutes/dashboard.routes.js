import { Router } from 'express';

import dashboardPrivateRoutes from './private/routes.js';

const router = Router();

router.use('/private', dashboardPrivateRoutes);

export default router;
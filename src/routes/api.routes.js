import { Router } from 'express';

import authRoutes from './authRoutes/auth.routes';
import bookingsRoutes from './bookingsRoutes/bookings.routes';
import residentsRoutes from './residentsRoutes/residents.routes';
import roomRoutes from './roomRoutes/room.routes';
import dashboardRoutes from './dashboardRoutes/dashboard.routes';

const router = Router();

router.use('/auth', authRoutes);

// router.use('/dashboard',dashboardRoutes);

//router.use(authProtectedRoute.privateRouteMiddleware);

router.use('/booking', bookingsRoutes);

router.use('/residents',residentsRoutes);

router.use('/rooms',roomRoutes);

export default router;


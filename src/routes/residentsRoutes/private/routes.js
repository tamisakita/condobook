import { Router } from 'express';

const router = Router();

router.post('/signup', (req, res, next) => {
  try {
    return res.status(201).json({ message: 'Rota de signup'})
  } catch (error) {
    return next(error);
  }
});

export default router;


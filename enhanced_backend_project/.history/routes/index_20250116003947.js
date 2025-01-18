import express from 'express';
import authRoutes from './auth.js';
import productRoutes from './products.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/products', productRoutes);

export default router;

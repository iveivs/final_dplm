import express from 'express';
import authRoutes from './auth.js';
import productRoutes from './products.js';
import orderRoutes from "./orders.js";
import reviewRoutes from './reviews.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use("/orders", orderRoutes); 
router.use('/reviews', reviewRoutes);

export default router;

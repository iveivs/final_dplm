import express from 'express';
import { getAllProducts, createProduct, getProductById } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getAllProducts); // Получение всех продуктов
router.post('/', createProduct); // Создание продукта
router.get('/:id', getProductById); // Получение продукта по _id

export default router;


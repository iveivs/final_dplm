import express from 'express';
import { registerUser, loginUser, getAllUsers } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', getAllUsers); // Добавляем маршрут для получения всех пользователей

export default router;

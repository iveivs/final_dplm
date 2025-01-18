import express from 'express';
import { registerUser, loginUser, getAllUsersб getCurrentUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', getAllUsers);
router.get('/user', getCurrentUser);

export default router;

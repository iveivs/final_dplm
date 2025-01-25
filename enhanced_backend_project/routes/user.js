import express from 'express';
import { updatePhone, deletePhone } from '../controllers/userController.js';
import {authenticateToken} from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/phone', authenticateToken, updatePhone);

router.delete('/phone', authenticateToken, deletePhone);

export default router;

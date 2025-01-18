import express from "express";
import { createOrder } from "../controllers/orderController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

// POST /orders — создание заказа (только для авторизованных пользователей)
router.post("/", authenticateUser, createOrder);

export default router;

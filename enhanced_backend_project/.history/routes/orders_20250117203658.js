import express from "express";
import { createOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);
// POST /orders — создание заказа (только для авторизованных пользователей)
router.post("/", authenticateUser, createOrder);

export default router;

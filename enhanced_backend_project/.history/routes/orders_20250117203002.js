import express from "express";
import { createOrder } from "../controllers/orderController.js";

const router = express.Router();

// POST /orders — создание заказа
router.post("/", createOrder);

export default router;

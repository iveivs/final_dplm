import express from "express";
import { getAllReviews } from "../controllers/reviewController.js";

const router = express.Router();

// GET /reviews — получить все отзывы
router.get("/", getAllReviews);

export default router;

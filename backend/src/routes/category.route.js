import express from 'express';
import { addCategory, getCategories } from '../controllers/category.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();
router.post("/addcat",protectRoute, addCategory);
router.get("/getCat",protectRoute, getCategories);

export default router;
import express from 'express';

const router = express.Router();
router.post("/addcat", addCategory);
router.get("/getCat", getCategories);

export default router;
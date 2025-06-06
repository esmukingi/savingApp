import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { addGoal, getGoalForClass } from '../controllers/goal.controller.js';

const router = express.Router();

router.post('/addGoal', protectRoute, addGoal);
router.get('/getGoalForClass', protectRoute, getGoalForClass)
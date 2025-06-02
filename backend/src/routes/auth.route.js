import express from 'express';
import { changePassword, checkAuth, login, logout } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.get('/check',protectRoute,checkAuth);
router.post('/changePassword',protectRoute, changePassword);

export default router;
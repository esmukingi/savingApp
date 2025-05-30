import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { addOrUpdateMonthlySaving, deleteUserSavingById, getSavings, updateSpecificMonthSaving } from "../controllers/saving.controller.js";
const router = express.Router();

router.post('/addSave', protectRoute, addOrUpdateMonthlySaving);
router.delete('/delete/:id', protectRoute, deleteUserSavingById);
router.put('/update/:id', protectRoute, updateSpecificMonthSaving);
router.get('/getdata', protectRoute, getSavings);


export default router;
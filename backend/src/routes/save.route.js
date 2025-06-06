import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { addOrUpdateMonthlySaving, deleteUserSavingById, getSavingsForBussiness, getSavingsForClass, getSavingsForDriving, getSavingsForLand, updateSpecificMonthSaving } from "../controllers/saving.controller.js";
const router = express.Router();

router.post('/addSave', protectRoute, addOrUpdateMonthlySaving);
router.delete('/delete/:id', protectRoute, deleteUserSavingById);
router.put('/update/:id', protectRoute, updateSpecificMonthSaving);
router.get('/getClassData', protectRoute, getSavingsForClass);
router.get('/getLandData', protectRoute, getSavingsForLand)
router.get('/getDrivingData', protectRoute, getSavingsForDriving)
router.get('/getBussiness', protectRoute, getSavingsForBussiness);

export default router;
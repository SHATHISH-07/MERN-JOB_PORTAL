import express from "express";
import { protect, authorize } from "../middleware/auth.middleware.js";
import {
  createOrUpdateProfile,
  getMyProfile,
} from "../controllers/employerProfile.controller.js";

const router = express.Router();

router.use(protect, authorize("EMPLOYER"));

router.post("/me", createOrUpdateProfile);
router.get("/me", getMyProfile);

export default router;

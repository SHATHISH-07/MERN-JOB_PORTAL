import express from "express";
import { protect, authorize } from "../middleware/auth.middleware.js";
import {
  applyForJob,
  getMyApplications,
  getApplicantsForJob,
  updateApplicationStatus,
} from "../controllers/jobApplication.controller.js";

const router = express.Router();

// Job seeker
router.post("/:jobId/apply", protect, authorize("JOB_SEEKER"), applyForJob);
router.get("/me", protect, authorize("JOB_SEEKER"), getMyApplications);

// Employer
router.get("/job/:jobId", protect, authorize("EMPLOYER"), getApplicantsForJob);
router.put(
  "/:id/status",
  protect,
  authorize("EMPLOYER"),
  updateApplicationStatus
);

export default router;

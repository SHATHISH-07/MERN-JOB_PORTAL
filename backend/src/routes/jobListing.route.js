import express from "express";
import {
  createJob,
  getAllJobs,
  getEmployerJobs,
  updateJob,
  deleteJob,
  getJobById,
  getPublicJobById,
} from "../controllers/jobListing.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getAllJobs);
router.post("/", protect, createJob);
router.get("/me", protect, getEmployerJobs);
router.put("/:id", protect, updateJob);
router.delete("/:id", protect, deleteJob);
router.get("/:id", protect, getJobById);
router.get("/public/:id", getPublicJobById);

export default router;

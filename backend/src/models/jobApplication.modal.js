import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobListing",
      required: true,
      index: true,
    },

    jobSeekerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    employerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Snapshot of applicant data (important)
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    resumeUrl: { type: String },
    coverLetter: { type: String },

    status: {
      type: String,
      enum: ["APPLIED", "SHORTLISTED", "REJECTED", "HIRED"],
      default: "APPLIED",
      index: true,
    },
  },
  { timestamps: true }
);

// Prevent duplicate applications
jobApplicationSchema.index({ jobId: 1, jobSeekerId: 1 }, { unique: true });

export default mongoose.model("JobApplication", jobApplicationSchema);

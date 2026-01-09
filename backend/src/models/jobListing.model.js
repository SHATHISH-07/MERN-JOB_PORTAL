import mongoose from "mongoose";

const jobListingSchema = new mongoose.Schema(
  {
    employerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: { type: String, required: true },
    description: { type: String, required: true },

    responsibilities: [{ type: String }],
    qualifications: [{ type: String }],

    jobType: {
      type: String,
      enum: ["FULL_TIME", "PART_TIME", "REMOTE", "INTERNSHIP"],
      required: true,
    },

    location: { type: String },
    salaryMin: { type: Number },
    salaryMax: { type: Number },

    isActive: { type: Boolean, default: true },

    status: {
      type: String,
      enum: ["OPEN", "CLOSED"],
      default: "OPEN",
      index: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("JobListing", jobListingSchema);

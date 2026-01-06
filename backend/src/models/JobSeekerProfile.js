import mongoose from "mongoose";

const jobSeekerProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Personal
    fullName: { type: String, required: true },
    phone: { type: String },
    location: { type: String },

    // Professional
    currentRole: { type: String },
    skills: [{ type: String }],
    experience: { type: String },
    experienceLevel: {
      type: String,
      enum: ["FRESHER", "JUNIOR", "MID", "SENIOR"],
    },

    // Job preferences
    preferredJobType: {
      type: String,
      enum: ["FULL_TIME", "PART_TIME", "REMOTE", "INTERNSHIP"],
    },
    expectedSalary: { type: Number },
    noticePeriod: { type: String },

    // Links & documents
    resumeUrl: { type: String },
    linkedinUrl: { type: String },
    portfolioUrl: { type: String },

    // Education
    education: { type: String },
    certifications: [{ type: String }],

    bio: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("JobSeekerProfile", jobSeekerProfileSchema);

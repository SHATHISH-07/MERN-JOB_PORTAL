import mongoose from "mongoose";

const employerProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    companyName: { type: String, required: true },
    industry: { type: String },

    companyDescription: { type: String },
    companyWebsite: { type: String },
    companySize: {
      type: String,
      enum: ["1-10", "11-50", "51-200", "201-500", "500+"],
    },
    companyType: {
      type: String,
      enum: ["STARTUP", "MNC", "AGENCY", "PRODUCT"],
    },

    foundedYear: { type: Number },
    location: { type: String },

    contactEmail: { type: String },
    contactPhone: { type: String },

    logoUrl: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("EmployerProfile", employerProfileSchema);

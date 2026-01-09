import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import jobSeekerProfileRoutes from "./routes/jobSeekerProfile.route.js";
import employerProfileRoutes from "./routes/employerProfile.route.js";
import jobListingRoutes from "./routes/jobListing.route.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/jobseeker/profile", jobSeekerProfileRoutes);
app.use("/api/employer/profile", employerProfileRoutes);

app.use("/api/jobs", jobListingRoutes);

export default app;

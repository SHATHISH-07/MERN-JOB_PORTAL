import JobApplication from "../models/jobApplication.modal.js";
import JobListing from "../models/jobListing.model.js";
import JobSeekerProfile from "../models/JobSeekerProfile.js";
import User from "../models/user.js";

export const applyForJob = async (req, res) => {
  const { jobId } = req.params;
  const { coverLetter } = req.body;

  // 1. Fetch logged-in user
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // 2. Fetch job seeker profile
  const profile = await JobSeekerProfile.findOne({
    userId: req.user.id,
  });

  if (!profile) {
    return res.status(400).json({
      message: "Please complete your profile before applying",
    });
  }

  // 3. Fetch job listing
  const job = await JobListing.findById(jobId);

  if (!job || job.status !== "OPEN") {
    return res.status(400).json({
      message: "This job is no longer accepting applications",
    });
  }

  // 4. Prevent duplicate application
  const alreadyApplied = await JobApplication.findOne({
    jobId,
    jobSeekerId: req.user.id,
  });

  if (alreadyApplied) {
    return res.status(400).json({
      message: "You have already applied for this job",
    });
  }

  // 5. Create application (SNAPSHOT DATA ✅)
  const application = await JobApplication.create({
    jobId: job._id,
    jobSeekerId: req.user.id,
    employerId: job.employerId,

    fullName: profile.fullName,
    email: user.email,
    phone: profile.phone,
    resumeUrl: profile.resumeUrl,

    coverLetter,
  });

  res.status(201).json({
    message: "Application submitted successfully",
    application,
  });
};

export const getMyApplications = async (req, res) => {
  const apps = await JobApplication.find({
    jobSeekerId: req.user.id,
  })
    .populate("jobId", "title location jobType")
    .sort({ createdAt: -1 });

  res.json(apps);
};

export const getApplicantsForJob = async (req, res) => {
  const { jobId } = req.params;

  const apps = await JobApplication.find({
    jobId,
    employerId: req.user.id,
  }).sort({ createdAt: -1 });

  res.json(apps);
};

export const updateApplicationStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const allowedStatuses = ["APPLIED", "SHORTLISTED", "REJECTED", "HIRED"];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const app = await JobApplication.findOneAndUpdate(
    { _id: id, employerId: req.user.id },
    { status },
    { new: true }
  );

  if (!app) {
    return res.status(404).json({ message: "Application not found" });
  }

  res.json(app);
};

export const getEmployerJobs = async (req, res) => {
  const jobs = await JobListing.find({ employerId: req.user.id })
    .sort({ createdAt: -1 })
    .lean();

  const jobIds = jobs.map((j) => j._id);

  const counts = await JobApplication.aggregate([
    { $match: { jobId: { $in: jobIds } } },
    { $group: { _id: "$jobId", total: { $sum: 1 } } },
  ]);

  const countMap = {};
  counts.forEach((c) => (countMap[c._id] = c.total));

  const result = jobs.map((job) => ({
    ...job,
    applicantsCount: countMap[job._id] || 0,
  }));

  res.json(result);
};

import JobSeekerProfile from "../models/JobSeekerProfile.js";

export const createOrUpdateProfile = async (req, res) => {
  const profile = await JobSeekerProfile.findOneAndUpdate(
    { userId: req.user.id },
    { ...req.body, userId: req.user.id },
    { new: true, upsert: true }
  );

  res.json(profile);
};

export const getMyProfile = async (req, res) => {
  const profile = await JobSeekerProfile.findOne({ userId: req.user.id });

  if (!profile) {
    return res.status(404).json({ message: "Profile not found" });
  }

  res.json(profile);
};

import EmployerProfile from "../models/EmployerProfile.js";

export const createOrUpdateProfile = async (req, res) => {
  const profile = await EmployerProfile.findOneAndUpdate(
    { userId: req.user.id },
    { ...req.body, userId: req.user.id },
    { new: true, upsert: true }
  );

  res.json(profile);
};

export const getMyProfile = async (req, res) => {
  const profile = await EmployerProfile.findOne({ userId: req.user.id });

  if (!profile) {
    return res.status(404).json({ message: "Profile not found" });
  }

  res.json(profile);
};

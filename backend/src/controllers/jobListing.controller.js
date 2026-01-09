import mongoose from "mongoose";
import JobListing from "../models/jobListing.model.js";

export const createJob = async (req, res) => {
  try {
    const job = await JobListing.create({
      ...req.body,
      employerId: req.user.id,
    });
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: "Failed to create job" });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const { keyword, location, jobType } = req.query;

    const query = { isActive: true, status: "OPEN" };

    if (keyword) {
      query.title = { $regex: keyword, $options: "i" };
    }
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }
    if (jobType) query.jobType = jobType;

    const jobs = await JobListing.aggregate([
      { $match: query },
      {
        $lookup: {
          from: "employerprofiles",
          localField: "employerId",
          foreignField: "userId",
          as: "company",
        },
      },
      { $unwind: "$company" },
      { $sort: { createdAt: -1 } },
    ]);

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs" });
  }
};

export const getEmployerJobs = async (req, res) => {
  try {
    const jobs = await JobListing.find({ employerId: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching your jobs" });
  }
};

export const updateJob = async (req, res) => {
  try {
    const job = await JobListing.findOneAndUpdate(
      { _id: req.params.id, employerId: req.user.id },
      req.body,
      { new: true }
    );

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: "Error updating job" });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const job = await JobListing.findOneAndDelete({
      _id: req.params.id,
      employerId: req.user.id,
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({ message: "Job deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting job" });
  }
};

export const getJobById = async (req, res) => {
  try {
    const job = await JobListing.findOne({
      _id: req.params.id,
      employerId: req.user.id,
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: "Error fetching job" });
  }
};

export const getPublicJobById = async (req, res) => {
  const job = await JobListing.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.params.id),
        isActive: true,
        status: "OPEN",
      },
    },
    {
      $lookup: {
        from: "employerprofiles",
        localField: "employerId",
        foreignField: "userId",
        as: "company",
      },
    },
    { $unwind: "$company" },
  ]);

  if (!job.length) {
    return res.status(404).json({ message: "Job not found" });
  }

  res.json(job[0]);
};

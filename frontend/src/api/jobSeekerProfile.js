import axios from "axios";
const API = "http://localhost:5000/api/jobseeker/profile/me";

export const getJobSeekerProfile = (token) =>
  axios.get(API, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const saveJobSeekerProfile = (data, token) =>
  axios.post(API, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

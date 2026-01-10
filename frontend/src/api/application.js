import axios from "axios";

const API = "http://localhost:5000/api/applications";

export const applyForJob = (jobId, data, token) =>
  axios.post(`${API}/${jobId}/apply`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getMyApplications = (token) =>
  axios.get(`${API}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getApplicantsForJob = (jobId, token) =>
  axios.get(`${API}/job/${jobId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateApplicationStatus = (id, status, token) =>
  axios.put(
    `${API}/${id}/status`,
    { status },
    { headers: { Authorization: `Bearer ${token}` } }
  );

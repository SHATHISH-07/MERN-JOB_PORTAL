import axios from "axios";

const API = "http://localhost:5000/api/jobs";

export const getJobs = (params) => axios.get(API, { params });

export const getMyJobs = (token) =>
  axios.get(`${API}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const createJob = (data, token) =>
  axios.post(API, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateJob = (id, data, token) =>
  axios.put(`${API}/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteJob = (id, token) =>
  axios.delete(`${API}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getJobById = (id, token) =>
  axios.get(`${API}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getPublicJobById = (id) => axios.get(`${API}/public/${id}`);

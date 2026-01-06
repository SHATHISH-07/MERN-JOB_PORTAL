import axios from "axios";
const API = "http://localhost:5000/api/employer/profile/me";

export const getEmployerProfile = (token) =>
  axios.get(API, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const saveEmployerProfile = (data, token) =>
  axios.post(API, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

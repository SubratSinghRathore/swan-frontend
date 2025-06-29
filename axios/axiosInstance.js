import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: 'https://swan-backend.onrender.com',
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

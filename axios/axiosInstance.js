import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://swan-backend.onrender.com',
    withCredentials: true
});
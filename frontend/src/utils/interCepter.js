import axios from "axios";

const API_URI = import.meta.env.VITE_API_URI;

export const axiosInstance = axios.create({
  baseURL: API_URI,
  withCredentials: true,
  timeout: 10000
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error); 
  }
);

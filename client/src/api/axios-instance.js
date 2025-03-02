import axios from "axios";

const axiosInstance = axios.create({ baseURL: "https://lms-mern-backend.onrender.com" });

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);

export default axiosInstance;

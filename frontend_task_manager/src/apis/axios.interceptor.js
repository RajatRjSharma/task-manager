import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

axios.defaults.baseURL = API_URL;

axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

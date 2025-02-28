import axios from "axios";
import { store } from "../redux/store";
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://api.example.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Interceptor cho request
instance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    if (config.token) {
      config.headers["Authorization"] = `Bearer ${config.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;

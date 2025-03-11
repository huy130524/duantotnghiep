import axios from "axios";
import { getAccessToken } from "../hooks/useAuth";

export const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

api.interceptors.request.use(
  function (config) {
    const token = getAccessToken();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

import axios from "axios";
import { getAccessToken, logout } from "../hooks/useAuth";
import { message } from "antd";

export const api = axios.create({
  baseURL:
    "https://583a-2405-4802-1d9f-f160-dd58-157a-dcd-db4d.ngrok-free.app/api",
});

api.interceptors.request.use(
  function (config) {
    const token = getAccessToken();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    config.headers["ngrok-skip-browser-warning"] = "69420";

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
    if (error.status === 401) {
      message.error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại");

      setTimeout(() => {
        logout();
      }, 1000);
    }
    return Promise.reject(error);
  }
);

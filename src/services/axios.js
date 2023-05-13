import axios from "axios";

import { baseUrl } from "../constants/constants";
import { Navigate } from "react-router-dom";

const axiosInstance = axios.create({});

async function refreshAccessToken() {
  try {
    const refreshToken = localStorage.getItem("refreshToken");

    const response = await axiosInstance.post(`${baseUrl}/auth/refresh`, {
      token: refreshToken,
    });

    const accessToken = response.data.accessToken;
    console.log("accessToken", accessToken);
    localStorage.setItem("accessToken", accessToken);

    return accessToken;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Handle invalid refresh token error
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      Navigate("/login");
      // Redirect to login page or display an error message
    } else {
      // Handle other errors
      console.error(error);
      // Display an error message
    }
    throw error;
  }
}

//request interceptor to add the auth token header to requests
axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken && !config.url.includes("auth")) {
      config.headers["Authorization"] = "Bearer " + accessToken;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

//response interceptor to refresh token on receiving token expired error
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      !originalRequest.retry &&
      localStorage.getItem("refreshToken") &&
      localStorage.getItem("accessToken")
    ) {
      originalRequest.retry = true;
      localStorage.removeItem("accessToken");
      // const retryConfig = Object.assign({}, originalRequest, {
      //   retry: true,
      // });
      const accessToken = await refreshAccessToken();

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;

      return axiosInstance(originalRequest);
    }

    return Promise.reject(error);
  }
);

export { axiosInstance };

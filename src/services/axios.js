import axios from "axios";

import { baseUrl } from "../constants/constants";

const axiosInstance = axios.create({});

//request interceptor to add the auth token header to requests
axiosInstance.interceptors.request.use(
  (config) => {
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
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    let refreshToken = localStorage.getItem("refreshToken");
    if (
      refreshToken &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      return axiosInstance
        .post(`${baseUrl}/auth/ref`, { token: refreshToken })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("accessToken", res.data.accessToken);
            console.log("Access token refreshed!");
            return axiosInstance(originalRequest);
          }
        })
        .catch((res) => {
          if (res.response.status === 403) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
          }
          //   if (res.status === 401) {
          //     console.log("toekn expired", res);
          //   }
        });
    }
    return Promise.reject(error);
  }
);

// const jwtInterceptor = axios.create({});

// jwtInterceptor.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     if (error.response.status === 401) {
//       await axios
//         .get("http://localhost:4000/ref", {
//           withCredentials: true,
//         })
//         .catch((err) => {
//           return Promise.reject(err);
//         });
//       console.log(error.config);
//       return axios(error.config);
//     } else {
//       return Promise.reject(error);
//     }
//   }
// );
//functions to make api calls

export { axiosInstance };

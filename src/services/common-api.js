import { axiosInstance } from "./axios";
import { baseUrl } from "../constants/constants";

const api = {
  signup: (body) => {
    return axiosInstance.post(`${baseUrl}/auth/signup`, body);
  },
  login: (body) => {
    return axiosInstance.post(`${baseUrl}/auth/signin`, body);
  },
  refreshToken: (body) => {
    return axiosInstance.post(`${baseUrl}/auth/refresh`, body);
  },
  logout: () => {
    return axiosInstance.post(`${baseUrl}/auth/signout`);
  },

  getPlans: () => {
    return axiosInstance.get(`${baseUrl}/plans`);
  },
  getOrganizations: () => {
    return axiosInstance.get(`${baseUrl}/organizations`);
  },
  getUserDetails: (body) => {
    console.log(body);
    return axiosInstance.get(`${baseUrl}/users/${body.userId}`);
  },
};
export default api;

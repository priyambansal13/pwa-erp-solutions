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
    return axiosInstance.post(`${baseUrl}/auth/ref`, body);
  },
  logout: () => {
    return axiosInstance.post(`${baseUrl}/auth/signout`);
  },

  getUserDetails: (body) => {
    console.log(body);
    return axiosInstance.get(`${baseUrl}/users/${body.userId}`);
  },

  addRoles: (body) => {
    return axiosInstance.post(`${baseUrl}/roles`, body);
  },
  deleteRole: (body) => {
    return axiosInstance.delete(`${baseUrl}/roles/${body.id}`);
  },
  updateRoles: (body) => {
    return axiosInstance.put(`${baseUrl}/roles/${body.id}`, body);
  },

  getRoles: () => {
    return axiosInstance.get(`${baseUrl}/roles`);
  },
  addOrganization: (body) => {
    return axiosInstance.post(`${baseUrl}/organizations`, body);
  },
  getOrganizations: () => {
    return axiosInstance.get(`${baseUrl}/organizations`);
  },
  deleteOrganization: (body) => {
    return axiosInstance.delete(`${baseUrl}/organizations/${body.id}`);
  },
};
export default api;

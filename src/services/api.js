import { axios } from "./axios";
import { baseUrl } from "../constants/constants";

const api = {
  signup: (body) => {
    return axios.post(`${baseUrl}/auth/signup`, body);
  },
  login: (body) => {
    return axios.post(`${baseUrl}/auth/signin`, body);
  },
  refreshToken: (body) => {
    return axios.post(`${baseUrl}/auth/ref`, body);
  },
  logout: (body) => {
    return axios.delete(`${baseUrl}/auth/signout`, body);
  },

  getUserDetails: (body) => {
    console.log(body);
    return axios.get(`${baseUrl}/users/${body.userId}`);
  },
  getProtected: (body) => {
    return axios.get(`${baseUrl}/users/${body.id}`);
  },
};
export default api;

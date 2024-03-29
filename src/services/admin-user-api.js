import { axiosInstance } from "./axios";
import { baseUrl } from "../constants/constants";

const AdminUserApi = {
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

  addProductOrganization: (body) => {
    return axiosInstance.post(`${baseUrl}/products/org/product`, body);
  },
  addProductUser: (body) => {
    return axiosInstance.post(`${baseUrl}/products/user/product`, body);
  },

  getProducts: (organizationId) => {
    return axiosInstance.get(`${baseUrl}/products`);
  },
};
export default AdminUserApi;

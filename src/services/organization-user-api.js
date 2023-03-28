import { axiosInstance } from "./axios";
import { baseUrl } from "../constants/constants";

const OrganizationUserApi = {
  getCustomers: () => {
    return axiosInstance.get(`${baseUrl}/customer`);
  },
  addCustomer: (body) => {
    return axiosInstance.post(`${baseUrl}/customer`, body);
  },
  deleteCustomer: (body) => {
    return axiosInstance.delete(`${baseUrl}/customer/${body.id}`);
  },
  updateCustomer: (body) => {
    return axiosInstance.put(`${baseUrl}/customer/${body.id}`, body);
  },

  //* For Products page
  getProducts: () => {
    return axiosInstance.get(`${baseUrl}/roles`);
  },

  //* For adding stock to product page
  addStock: (body) => {
    return axiosInstance.post(`${baseUrl}/stock`, body);
  },

  //* For Suppliers page
  addSupplier: (body) => {
    return axiosInstance.post(`${baseUrl}/suppliers`, body);
  },
  getSuppliers: () => {
    return axiosInstance.get(`${baseUrl}/suppliers`);
  },
  deleteSupplier: (body) => {
    return axiosInstance.delete(`${baseUrl}/suppliers/${body.id}`);
  },
  updateSupplier: (body) => {
    return axiosInstance.put(`${baseUrl}/suppliers/${body.id}`, body);
  },

  //* For Sales page
  addSale: (body) => {
    return axiosInstance.post(`${baseUrl}/sales`, body);
  },
  getSales: () => {
    return axiosInstance.get(`${baseUrl}/sales`);
  },
  deleteSale: (body) => {
    return axiosInstance.delete(`${baseUrl}/sales/${body.id}`);
  },
  updateSale: (body) => {
    return axiosInstance.put(`${baseUrl}/sales/${body.id}`, body);
  },

  //* For Purchase page
  addPurchase: (body) => {
    return axiosInstance.post(`${baseUrl}/purchases`, body);
  },
  getPurchases: () => {
    return axiosInstance.get(`${baseUrl}/purchases`);
  },
  deletePurchase: (body) => {
    return axiosInstance.delete(`${baseUrl}/purchases/${body.id}`);
  },
  updatePurchase: (body) => {
    return axiosInstance.put(`${baseUrl}/purchases/${body.id}`, body);
  },
};
export default OrganizationUserApi;

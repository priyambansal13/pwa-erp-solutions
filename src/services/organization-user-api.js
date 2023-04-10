import { axiosInstance } from "./axios";
import { baseUrl } from "../constants/constants";

const userId = localStorage.getItem("userId");
const OrganizationUserApi = {
  getCustomers: () => {
    return axiosInstance.get(`${baseUrl}/customers`);
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
  getProductsForOrganization: (id) => {
    return axiosInstance.get(`${baseUrl}/inventories/organization/${id}`);
  },

  //* For stock page
  getStockList: () => {
    return axiosInstance.get(`${baseUrl}/stock/user/${userId}`);
  },
  addStockForProduct: (body) => {
    return axiosInstance.post(`${baseUrl}/stock`, {
      ...body,
      user: { id: userId },
    });
  },

  //* For Suppliers page
  addSupplier: (body) => {
    return axiosInstance.post(`${baseUrl}/supplier`, body);
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
    return axiosInstance.post(`${baseUrl}/sale`, {
      ...body,
      userId: userId,
    });
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
    return axiosInstance.post(`${baseUrl}/purchase`, {
      ...body,
      userId: userId,
    });
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

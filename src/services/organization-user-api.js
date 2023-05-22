import { axiosInstance } from "./axios";
import { baseUrl } from "../constants/constants";

const userId = localStorage.getItem("userId");
const OrganizationUserApi = {
  getCustomers: () => {
    return axiosInstance.get(`${baseUrl}/customers`);
  },
  addCustomer: (body) => {
    return axiosInstance.post(`${baseUrl}/customers`, body);
  },
  deleteCustomer: (body) => {
    return axiosInstance.delete(`${baseUrl}/customers/${body.id}`);
  },
  updateCustomer: (body) => {
    return axiosInstance.put(`${baseUrl}/customers/${body.id}`, body);
  },

  //* For Products page
  getProductsForOrganization: (id) => {
    return axiosInstance.get(`${baseUrl}/products/org/${id}`);
  },

  //* Delete Product
  deleteProduct: (body) => {
    return axiosInstance.delete(`${baseUrl}/products/${body.id}`);
  },
  //* For stock page
  getStockList: () => {
    return axiosInstance.get(`${baseUrl}/stocks/user/${userId}`);
  },
  addStockForProduct: (body) => {
    return axiosInstance.post(`${baseUrl}/stocks`, {
      ...body,
      // user: { id: userId },
    });
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
    return axiosInstance.post(`${baseUrl}/sales`, {
      ...body,
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

  // * API for getting sales invoice number
  getNewSaleInvoiceNumber: () => {
    return axiosInstance.get(`${baseUrl}/sales/new-invoice-number`);
  },

  //* For Purchase page
  addPurchase: (body) => {
    return axiosInstance.post(`${baseUrl}/purchases`, {
      ...body,
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

  // * API for Payment controller

  getAllPayments: () => {
    return axiosInstance.get(`${baseUrl}/payments`);
  },
  getAllPaymentsForSupplier: (body) => {
    if (body.from && body.to) {
      return axiosInstance.get(
        `${baseUrl}/payments/supplier/${body?.id}?from=${body.from}&to=${body.to}`
      );
    } else {
      return axiosInstance.get(`${baseUrl}/payments/supplier/${body?.id}`);
    }
  },
  getPaymentsPayable: () => {
    return axiosInstance.get(`${baseUrl}/payments/payable`);
  },
  addPayment: (body) => {
    return axiosInstance.post(`${baseUrl}/payments`, {
      ...body,
    });
  },
  deletePayment: (body) => {
    return axiosInstance.delete(`${baseUrl}/payments/${body.id}`);
  },
  updatePayment: (body) => {
    return axiosInstance.put(`${baseUrl}/payments/${body.id}`, body);
  },

  // * API for Receipt controller

  getAllReceipts: () => {
    return axiosInstance.get(`${baseUrl}/receipts`);
  },
  getAllReceiptsForCustomer: (body) => {
    if (body.from && body.to) {
      return axiosInstance.get(
        `${baseUrl}/receipts/customer/${body?.id}?from=${body.from}&to=${body.to}`
      );
    } else {
      return axiosInstance.get(`${baseUrl}/receipts/customer/${body?.id}`);
    }
  },
  getReceiptsReceivable: () => {
    return axiosInstance.get(`${baseUrl}/receipts/receivable`);
  },
  addReceipt: (body) => {
    return axiosInstance.post(`${baseUrl}/receipts`, {
      ...body,
    });
  },
  deleteReceipt: (body) => {
    return axiosInstance.delete(`${baseUrl}/receipts/${body.id}`);
  },
  updateReceipt: (body) => {
    return axiosInstance.put(`${baseUrl}/receipts/${body.id}`, body);
  },

  // * API for Bank Account controller

  getBankList: () => {
    return axiosInstance.get(`${baseUrl}/banks/list`);
  },
  getUserAccounts: () => {
    return axiosInstance.get(`${baseUrl}/banks/accounts`);
  },

  addAccount: (body) => {
    return axiosInstance.post(`${baseUrl}/banks`, {
      ...body,
    });
  },
  // deleteReceipt: (body) => {
  //   return axiosInstance.delete(`${baseUrl}/banks/${body.id}`);
  // },
  updateAccount: (body) => {
    return axiosInstance.put(`${baseUrl}/banks/${body.id}`, body);
  },

  // * API for getting expese category for payments as expense
  getExpenseCategory: () => {
    return axiosInstance.get(`${baseUrl}/expenses/categories`);
  },

  // * API for importing products
  importProductsUserSpecific: (body) => {
    return axiosInstance.post(
      `${baseUrl}/upload/products?userId=${userId}`,
      body,
      {
        responseType: "arraybuffer",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },
  importProductsOrganizationSpecific: (body) => {
    return axiosInstance.put(
      `${baseUrl}/upload/products?orgId=${userId}`,
      body
    );
  },

  getProducts: () => {
    return axiosInstance.get(`${baseUrl}/products/user`);
  },
};

export default OrganizationUserApi;

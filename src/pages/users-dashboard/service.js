// eslint-disable-next-line
import OrganizationUserApi from "../../services/organization-user-api";

export const getSales = async () => {
  console.log("Sales list");
  let response = null;
  //response = await OrganizationUserApi.getSales();
  return { salesList: response };
};
export const getPurchase = async () => {
  console.log("Purchase list");
  let response = null;
  //response = await OrganizationUserApi.getPurchases();
  return { purchaseList: response };
};

export const getProducts = async () => {
  console.log("product list");
  let response = null;
  //response = await OrganizationUserApi.getProducts();
  return { productsList: response };
};

export const getSuppliers = async () => {
  console.log("Supplier list");
  let response = null;
  //response = await OrganizationUserApi.getSuppliers();
  return { suppliersList: response };
};

export const getCustomers = async () => {
  console.log("customer list");
  let response = null;
  //response = await OrganizationUserApi.getCustomers();
  return { customersList: response };
};

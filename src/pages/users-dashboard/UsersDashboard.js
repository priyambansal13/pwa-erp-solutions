import React, { useEffect } from "react";
import {
  setCustomersListAction,
  setProductsForOrganizationListAction,
  setPurchaseListAction,
  setSalesListAction,
  setStockListAction,
  setSuppliersListAction,
} from "../../store/reducers/organization-user.state";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../store/reducers/authentication";
import OrganizationUserApi from "../../services/organization-user-api";
import api from "../../services/common-api";
import { formatStockData, getFormattedSalesList } from "../../utils/user-utils";

const UsersDashboard = () => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const organizationId = localStorage.getItem("organizationId");

  useEffect(
    () => {
      if (userId) {
        getUserDetails(userId);
        getProductsForOrganization();
        getStockList();
        getCustomerList();
        getSupplierList();
        getPurchaseList();
        getSalesList();
        // dispatch(setCustomersListAction(getCustomers()));

        // dispatch(setPurchaseListAction(getPurchase()));
        // dispatch(setSalesListAction(getSales()));
        // dispatch(setSuppliersListAction(getSuppliers()));
      }
    },
    // eslint-disable-next-line
    []
  );

  const getUserDetails = async (userId) => {
    const response = await api.getUserDetails({
      userId,
    });
    localStorage.setItem("organizationId", response.data.organization.id);
    dispatch(setUserDetails({ userDetails: response.data }));
  };

  const getProductsForOrganization = async () => {
    const response = await OrganizationUserApi.getProductsForOrganization(
      organizationId
    );
    dispatch(
      setProductsForOrganizationListAction({ productsList: response.data })
    );
  };

  const getStockList = async () => {
    const response = await OrganizationUserApi.getStockList(organizationId);
    const stockData = formatStockData(response.data);
    dispatch(setStockListAction({ stocksList: stockData }));
  };

  const getPurchaseList = async () => {
    const response = await OrganizationUserApi.getPurchases();
    // const stockData = formatStockData(response.data);
    dispatch(setPurchaseListAction({ purchaseList: response.data }));
  };

  const getSalesList = async () => {
    const response = await OrganizationUserApi.getSales();
    const formattedSalesList = getFormattedSalesList(response.data);

    dispatch(setSalesListAction({ salesList: formattedSalesList }));
  };

  const getCustomerList = async () => {
    const response = await OrganizationUserApi.getCustomers();
    dispatch(setCustomersListAction({ customersList: response.data }));
  };

  const getSupplierList = async () => {
    const response = await OrganizationUserApi.getSuppliers();
    dispatch(setSuppliersListAction({ suppliersList: response.data }));
  };
  return <> Users Dashboard Page</>;
};

export default UsersDashboard;

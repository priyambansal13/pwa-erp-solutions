import React, { useEffect } from "react";
import {
  getSales,
  getCustomers,
  getProducts,
  getPurchase,
  getSuppliers,
} from "./service";
import {
  setCustomersListAction,
  setProductsListAction,
  setPurchaseListAction,
  setSalesListAction,
  setSuppliersListAction,
} from "../../store/reducers/organization-user.state";
import { useDispatch } from "react-redux";

const UsersDashboard = () => {
  const dispatch = useDispatch();
  useEffect(
    () => {
      dispatch(setCustomersListAction(getCustomers()));
      dispatch(setProductsListAction(getProducts()));
      dispatch(setPurchaseListAction(getPurchase()));
      dispatch(setSalesListAction(getSales()));
      dispatch(setSuppliersListAction(getSuppliers()));
    },
    // eslint-disable-next-line
    []
  );

  return <> Users Dashboard Page</>;
};

export default UsersDashboard;

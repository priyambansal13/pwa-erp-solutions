import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import api from "../../services/common-api";
import AdminUserApi from "../../services/admin-user-api";
import {
  setOrganizationListAction,
  setProductListAction,
  setRolesListAction,
} from "../../store/reducers/admin-user.state";
import { setUserDetails } from "../../store/reducers/authentication";
import "./adminDashboard.scss";

const AdminDashboard = (props) => {
  const dispatch = useDispatch();
  // const userDetails = localStorage.getItem("userDetails");
  const userId = localStorage.getItem("userId");

  useEffect(
    () => {
      if (userId) {
        getUserDetails(userId);
        getRolesList();
        getOrganizationList();
        getProductsList();
      }
    }, // eslint-disable-next-line
    []
  );

  const getRolesList = async () => {
    const response = await AdminUserApi.getRoles();

    dispatch(setRolesListAction({ rolesList: response.data }));
  };
  const getProductsList = async () => {
    const response = await AdminUserApi.getProducts();

    dispatch(setProductListAction({ productsList: response.data }));
  };

  const getUserDetails = async (userId) => {
    const response = await api.getUserDetails({
      userId,
    });
    console.log(response.data);
    dispatch(setUserDetails({ userDetails: response.data }));
  };

  const getOrganizationList = async () => {
    const response = await AdminUserApi.getOrganizations();
    dispatch(setOrganizationListAction({ organizationList: response.data }));
  };
  return (
    <>
      <div>Dashboard Page</div>
    </>
  );
};

export default AdminDashboard;

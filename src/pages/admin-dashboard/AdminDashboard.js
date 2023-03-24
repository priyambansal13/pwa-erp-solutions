import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import api from "../../services/api";
import {
  setOrganizationListAction,
  setRolesListAction,
} from "../../store/reducers/admin-state";
import { setUserDetails } from "../../store/reducers/authentication";
import "./adminDashboard.scss";

const AdminDashboard = (props) => {
  const dispatch = useDispatch();
  const userDetails = localStorage.getItem("userDetails");
  const userId = localStorage.getItem("userId");

  useEffect(
    () => {
      if (userId) {
        getUserDetails(userId);
        getRolesList();
        getOrganizationList();
      }
    }, // eslint-disable-next-line
    []
  );

  const getRolesList = async () => {
    const response = await api.getRoles();

    dispatch(setRolesListAction({ rolesList: response.data }));
  };

  const getUserDetails = async (userId) => {
    const response = await api.getUserDetails({
      userId,
    });
    console.log(response.data);
    dispatch(setUserDetails({ userDetails: response.data }));
  };

  const getOrganizationList = async () => {
    const response = await api.getOrganizations();
    dispatch(setOrganizationListAction({ organizationList: response.data }));
  };
  return (
    <>
      <div>Dashboard Page{userDetails}</div>
    </>
  );
};

export default AdminDashboard;

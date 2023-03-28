import React, { useEffect, useState } from "react";
import { Navigate, useOutlet } from "react-router-dom";
import AdminDashboard from "../pages/admin-dashboard/AdminDashboard";
import api from "../services/common-api";

export const ProtectedRoutes = () => {
  const [userDetails, setUserDetails] = useState({});
  const accessToken = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");
  const outlet = useOutlet();

  useEffect(
    () => {
      if (accessToken) {
        getUserDetails();
      }
    },
    // eslint-disable-next-line
    [accessToken]
  );

  const getUserDetails = async () => {
    const response = await api.getUserDetails({
      userId,
    });
    console.log(response);
    setUserDetails(response);
    localStorage.setItem("userDetails", JSON.stringify(response));
  };

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <AdminDashboard userDetails={userDetails} />
      {outlet}
    </>
  );
};

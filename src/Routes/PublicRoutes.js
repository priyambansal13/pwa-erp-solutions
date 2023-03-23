import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";

export const PublicRoutes = () => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div>
      <NavigationBar />
      <Outlet />
    </div>
  );
};

import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const PublicRoutes = () => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    return <Navigate to="/pwa-erp-solutions/dashboard" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

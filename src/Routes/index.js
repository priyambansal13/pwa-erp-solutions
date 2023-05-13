import { useRoutes } from "react-router-dom";

// project import
import AdminRoutes from "./AdminRoutes";
import OrganizationUserRoutes from "./OrganizationUserRoutes";
import { ADMIN } from "../constants/constants";

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  const token = localStorage.getItem("accessToken");
  let authenticated = token ? true : false;
  const userRole = localStorage.getItem("userRole");
  return useRoutes(
    userRole !== ADMIN
      ? OrganizationUserRoutes(authenticated)
      : AdminRoutes(authenticated)
  );
}

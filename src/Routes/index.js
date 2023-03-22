import { useRoutes } from "react-router-dom";

// project import
import AdminRoutes from "./AdminRoutes";
import OrganizationUserRoutes from "./OrganizationUserRoutes";

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  const token = localStorage.getItem("accessToken");
  let authenticated = token ? true : false;
  const userRole = localStorage.getItem("userRole");
  return useRoutes(
    userRole !== "ADMIN"
      ? OrganizationUserRoutes(authenticated)
      : AdminRoutes(authenticated)
  );
}

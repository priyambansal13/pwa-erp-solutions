// project import
import dashboard from "./dashboard";
import AdminUtilities from "./admin-utilities";
import OrganizationUtilities from "./organization-utilities";
import { ADMIN } from "../constants/constants";

// ==============================|| MENU ITEMS ||============================== //

const userRole = localStorage.getItem("userRole");
console.log(userRole, "userRole");

const menuItems = {
  items: [
    dashboard,
    userRole !== ADMIN ? OrganizationUtilities : AdminUtilities,
  ],
};

export default menuItems;

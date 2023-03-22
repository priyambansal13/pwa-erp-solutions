// project import
import dashboard from "./dashboard";
import AdminUtilities from "./admin-utilities";
import OrganizationUtilities from "./organization-utilities";

// ==============================|| MENU ITEMS ||============================== //

const userRole = localStorage.getItem("userRole");

const menuItems = {
  items: [
    dashboard,
    userRole !== "ADMIN" ? OrganizationUtilities : AdminUtilities,
  ],
};

export default menuItems;

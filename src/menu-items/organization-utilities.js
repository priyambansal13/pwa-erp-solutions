// assets

import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import CategoryIcon from "@mui/icons-material/Category";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import InventoryIcon from "@mui/icons-material/Inventory";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
// icons
const icons = {
  AddBusinessIcon,
  CategoryIcon,
  AdminPanelSettingsIcon,
  InventoryIcon,
  AttachMoneyIcon,
  PointOfSaleIcon,
  GroupAddIcon,
  GroupRemoveIcon,
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const OrganizationUtilities = {
  id: "utilities",
  title: "Utilities",
  type: "group",
  children: [
    {
      id: "util-sales",
      title: "Sales",
      type: "item",
      url: "/sales",
      icon: icons.AttachMoneyIcon,
      breadcrumbs: false,
    },
    {
      id: "util-purchase",
      title: "Purchases",
      type: "item",
      url: "/purchase",
      icon: icons.PointOfSaleIcon,
      breadcrumbs: false,
    },
    // {
    //   id: "util-products",
    //   title: "Products",
    //   type: "item",
    //   url: "/products",
    //   icon: icons.CategoryIcon,
    //   breadcrumbs: false,
    // },
    {
      id: "util-stock",
      title: "Stock",
      type: "item",
      url: "/product-stock",
      icon: icons.InventoryIcon,
      breadcrumbs: false,
    },
    {
      id: "util-suppliers",
      title: "Suppliers",
      type: "item",
      url: "/suppliers",
      icon: icons.GroupAddIcon,
      breadcrumbs: false,
    },

    {
      id: "util-customers",
      title: "Customers",
      type: "item",
      url: "/customers",
      icon: icons.GroupRemoveIcon,
      breadcrumbs: false,
    },
  ],
};

export default OrganizationUtilities;

// assets
import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  LoadingOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";

import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import CategoryIcon from "@mui/icons-material/Category";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

// icons
const icons = {
  FontSizeOutlined,
  BgColorsOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined,
  UsergroupAddOutlined,
  AddBusinessIcon,
  CategoryIcon,
  AdminPanelSettingsIcon,
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const AdminUtilities = {
  id: "utilities",
  title: "Utilities",
  type: "group",
  children: [
    {
      id: "util-roles",
      title: "Roles",
      type: "item",
      url: "/roles",
      icon: icons.AdminPanelSettingsIcon,
      breadcrumbs: false,
    },
    {
      id: "util-organizations",
      title: "Organizations",
      type: "item",
      url: "/organizations",
      icon: icons.AddBusinessIcon,
      breadcrumbs: false,
    },
    {
      id: "util-products",
      title: "Products",
      type: "item",
      url: "/products",
      icon: icons.CategoryIcon,
      breadcrumbs: false,
    },
    {
      id: "util-users",
      title: "Users",
      type: "item",
      url: "/users",
      icon: icons.UsergroupAddOutlined,
      breadcrumbs: false,
    },
  ],
};

export default AdminUtilities;

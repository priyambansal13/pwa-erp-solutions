// material-ui
import { Box, Typography } from "@mui/material";

// project import
import NavGroup from "./NavGroup";
import OrganizationUtilities from "../../../../../menu-items/organization-utilities";
import AdminUtilities from "../../../../../menu-items/admin-utilities";
import dashboard from "../../../../../menu-items/dashboard";

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const Navigation = () => {
  const userRole = localStorage.getItem("userRole");
  const utilityGroup =
    userRole === "ADMIN" ? AdminUtilities : OrganizationUtilities;
  const menuItem = { items: [dashboard, utilityGroup] };
  const navGroups = menuItem.items.map((item) => {
    switch (item.type) {
      case "group":
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });

  return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
};

export default Navigation;

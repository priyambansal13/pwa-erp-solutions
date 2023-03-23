// project import
import NavCard from "./NavCard";
import Navigation from "./Navigation";
import SimpleBar from "../../../../components/SimpleBar";

// ==============================|| DRAWER CONTENT ||============================== //

const DrawerContent = () => (
  <SimpleBar
    sx={{
      "& .simplebar-content": {
        display: "flex",
        flexDirection: "column",
      },
    }}
  >
    <div>
      <Navigation />
      <NavCard />
    </div>
  </SimpleBar>
);

export default DrawerContent;

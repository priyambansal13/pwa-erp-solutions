// project import
//import Loadable from "components/Loadable";
import MainLayout from "../layout/MainLayout";
import LandingPage from "../components/LandingPage";
import Login from "../pages/authentication/Login/Login";
import Register from "../pages/authentication/register/Register";
import Sales from "../pages/Sales/Sales";
import Purchase from "../pages/Purchase/Purchase";
import Suppliers from "../pages/Suppliers/Suppliers";
import Stock from "../pages/Stock/Stock";
import Customers from "../pages/Customers/Customers";
import UsersDashboard from "../pages/users-dashboard/UsersDashboard";

// render - dashboard
//const DashboardDefault = Loadable(lazy(() => import("pages/dashboard")));

// render - sample page
//const SamplePage = Loadable(lazy(() => import("pages/extra-pages/SamplePage")));

// -------------------------render - utilities
// const Typography = Loadable(
//   lazy(() => import("pages/components-overview/Typography"))
// );
// const Color = Loadable(lazy(() => import("pages/components-overview/Color")));
// const Shadow = Loadable(lazy(() => import("pages/components-overview/Shadow")));
// const AntIcons = Loadable(
//   lazy(() => import("pages/components-overview/AntIcons"))
// );

// ==============================|| MAIN ROUTING ||============================== //

const OrganizationUserRoutes = (isLoggedIn) => [
  {
    exact: true,
    path: "/",
    element: isLoggedIn ? <MainLayout /> : <LandingPage />,
    children: [
      {
        path: "/",
        element: <UsersDashboard />,
      },
      {
        path: "product-stock",
        element: <Stock />,
      },
      {
        path: "dashboard",
        children: [
          {
            path: "default",
            element: <UsersDashboard />,
          },
        ],
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "sales",
        element: <Sales />,
      },
      {
        path: "purchase",
        element: <Purchase />,
      },
      {
        path: "suppliers",
        element: <Suppliers />,
      },
    ],
  },
  {
    path: "/login",
    exact: true,
    element: <Login />,
  },
  {
    path: "/register",
    exact: true,
    element: <Register />,
  },
];

export default OrganizationUserRoutes;

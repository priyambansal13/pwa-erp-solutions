// project import
//import Loadable from "components/Loadable";
import MainLayout from "../layout/MainLayout";
import AdminDashboard from "../pages/admin-dashboard/AdminDashboard";
import LandingPage from "../components/LandingPage";
import Login from "../pages/authentication/Login/Login";
import Register from "../pages/authentication/register/Register";
import Products from "../pages/Products/Products";
import Organizations from "../pages/Organizations/Organizations";
import AdminUsers from "../pages/Users/AdminUsers";
import Roles from "../pages/Roles/Roles";

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

const AdminRoutes = (isLoggedIn) => [
  {
    exact: true,
    path: "/",
    element: isLoggedIn ? <MainLayout /> : <LandingPage />,
    children: [
      {
        path: "/",
        element: <AdminDashboard />,
      },
      {
        path: "roles",
        element: <Roles />,
      },
      {
        path: "dashboard",
        children: [
          {
            path: "default",
            element: <AdminDashboard />,
          },
        ],
      },

      {
        path: "organizations",
        element: <Organizations />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "users",
        element: <AdminUsers />,
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

export default AdminRoutes;

import { createBrowserRouter } from "react-router-dom";
import ClientLayout from "./Layout/ClientLayout/ClientLayout";
import HomePage from "./Pages/client/HomePage/HomePage";
import AppLayout from "./Layout/AppLayout/AppLayout";
import AdminLayout from "./Layout/AdminLayout/AdminLayout";
import LoginPage from "./Pages/client/Auth/LoginPage/LoginPage";
import RegisterPage from "./Pages/client/Auth/RegisterPage/RegisterPage";
import Dashboard from "./Pages/admin/Dashboard/Dashboard";
import ListCategory from "./Pages/admin/Category/ListCategory";
import AddCategory from "./Pages/admin/Category/AddCategory";
import UpdateCategory from "./Pages/admin/Category/UpdateCategory";
import ListBrand from "./Pages/admin/Brand/ListBand";
import AddBrand from "./Pages/admin/Brand/AddBrand";
import UpdateBrand from "./Pages/admin/Brand/UpdateBrand";
import ListColor from "./Pages/admin/Color/ListColor";
import AddColor from "./Pages/admin/Color/AddColor";
import UpdateColor from "./Pages/admin/Color/UpdateColor";

const router = createBrowserRouter([
  {
    path: "",
    element: <AppLayout />,
    children: [
      {
        path: "",
        element: <ClientLayout />,
        children: [
          {
            path: "",
            element: <HomePage />,
          },

          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "register",
            element: <RegisterPage />,
          },
        ],
      },

      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
          {
            path: "category",
            element: <ListCategory />,
          },
          {
            path: "category/add",
            element: <AddCategory />,
          },
          {
            path: "category/:id/edit",
            element: <UpdateCategory />,
          },

          // brand
          {
            path: "brand",
            element: <ListBrand />,
          },
          {
            path: "brand/add",
            element: <AddBrand />,
          },
          {
            path: "brand/:id/edit",
            element: <UpdateBrand />,
          },

          // color
          {
            path: "color",
            element: <ListColor />,
          },
          {
            path: "color/add",
            element: <AddColor />,
          },
          {
            path: "color/:id/edit",
            element: <UpdateColor />,
          },
        ],
      },
    ],
  },
]);

export default router;

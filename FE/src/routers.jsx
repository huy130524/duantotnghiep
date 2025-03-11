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
            children: [
              {
                path: "add",
                element: <AddCategory />,
              },
              {
                path: ":id/edit",
                element: <UpdateCategory />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;

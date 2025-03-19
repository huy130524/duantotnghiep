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
import ListSize from "./Pages/admin/Size/ListSize";
import AddSize from "./Pages/admin/Size/AddSize";
import UpdateSize from "./Pages/admin/Size/UpdateSize";
import ListBlog from "./Pages/admin/Blog/ListBlog";
import UpdateBlog from "./Pages/admin/Blog/UpdateCategory";
import AddBlog from "./Pages/admin/Blog/AddBlog";
import ListCoupon from "./Pages/admin/Coupon/ListCoupon";
import AddCoupon from "./Pages/admin/Coupon/AddCoupon";
import UpdateCoupon from "./Pages/admin/Coupon/UpdaterCoupon";
import ListProduct from "./Pages/admin/Product/ListProduct";
import AddProduct from "./Pages/admin/Product/AddProduct";
import UpdateProduct from "./Pages/admin/Product/UpdateProduct";
import AccountLayout from "./Layout/AccountLayout/AccountLayout";
import UpdateInformation from "./Pages/client/Profile/UpdateInformation/UpdateInformation";
import ChangePassword from "./Pages/client/Profile/ChangePassword/ChangePassword";
import ListAddress from "./Pages/client/Profile/Address/ListAddress";

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

          {
            path: "profile",
            element: <AccountLayout />,
            children: [
              {
                path: "",
                element: <UpdateInformation />,
              },
              {
                path: "change-password",
                element: <ChangePassword />,
              },
              {
                path: "address",
                element: <ListAddress />,
              },
            ],
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

          // kích thước
          {
            path: "size",
            element: <ListSize />,
          },
          {
            path: "size/add",
            element: <AddSize />,
          },
          {
            path: "size/:id/edit",
            element: <UpdateSize />,
          },

          // blog
          {
            path: "blog",
            element: <ListBlog />,
          },
          {
            path: "blog/add",
            element: <AddBlog />,
          },
          {
            path: "blog/:id/edit",
            element: <UpdateBlog />,
          },

          {
            path: "coupon",
            element: <ListCoupon />,
          },
          {
            path: "coupon/add",
            element: <AddCoupon />,
          },
          {
            path: "coupon/:id/edit",
            element: <UpdateCoupon />,
          },
          {
            path: "product",
            element: <ListProduct />,
          },
          {
            path: "product/add",
            element: <AddProduct />,
          },
          {
            path: "product/:id/edit",
            element: <UpdateProduct />,
          },
        ],
      },
    ],
  },
]);

export default router;

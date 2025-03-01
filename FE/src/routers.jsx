import { createBrowserRouter, Navigate } from "react-router-dom";
import LayoutWebsite from "./Pages/(website)/layout";
import HomePage from "./Pages/(website)/home/page";
import AboutPage from "./Pages/(website)/about/page";
import LayoutAdmin from "./pages/(admin)/layout";
import DashboardPage from "./Pages/(admin)/dashboard/page";
import AdminProductsPage from "./Pages/(admin)/products/page";
import AddProductPage from "./pages/(admin)/products-add/page";
import EditProductPage from "./Pages/(admin)/products-edit/page";
import Login from "./Pages/(website)/auth/page";
import Register from "./Pages/(website)/auth/register";
import Productdetaill from "./Pages/(website)/products/ProductDetails";
import Cart from "./Pages/(website)/products/Cart";
import CheckOut from "./Pages/(website)/products/CheckOut";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutWebsite />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "details", element: <Productdetaill /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <CheckOut /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/admin",
    element: <LayoutAdmin />,
    children: [
      { index: true, element: <Navigate to="/admin/dashboard" replace /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "products", element: <AdminProductsPage /> },
      { path: "products/add", element: <AddProductPage /> },
      { path: ":id/edit", element: <EditProductPage /> },
    ],
  },
]);

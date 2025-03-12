import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <header>admin header</header>

      <Outlet />

      <footer>admin footer</footer>
    </>
  );
};

export default AdminLayout;

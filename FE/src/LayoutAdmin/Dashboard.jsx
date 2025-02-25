import React from "react";
import HeaderAdmin from "./HeaderAdmin";
import Sidebar from "./Sidebar";
import Main from "./Main";

const Dashboard = () => {
  return (
    <div>
      <HeaderAdmin />
      <Sidebar />
      <Main />
    </div>
  );
};

export default Dashboard;

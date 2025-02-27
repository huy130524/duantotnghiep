import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate(); // ✅ Sử dụng hook để điều hướng

  const items = [
    {
      key: "1",
      icon: <PieChartOutlined />,
      label: "Dashboard",
      onClick: () => navigate("/admin/dashboard"), // ✅ Điều hướng đúng cách
    },
    {
      key: "2",
      icon: <DesktopOutlined />,
      label: "Products",
      onClick: () => navigate("/admin/products"), // ✅ Điều hướng thêm
    },
    {
      key: "sub1",
      icon: <UserOutlined />,
      label: "User",
      children: [
        { key: "3", label: "Tom" },
        { key: "4", label: "Bill" },
        { key: "5", label: "Alex" },
      ],
    },
    {
      key: "sub2",
      icon: <TeamOutlined />,
      label: "Team",
      children: [
        { key: "6", label: "Team 1" },
        { key: "8", label: "Team 2" },
      ],
    },
    { key: "9", icon: <FileOutlined />, label: "Files" },
  ];

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
      />
    </Sider>
  );
};

export default Sidebar;

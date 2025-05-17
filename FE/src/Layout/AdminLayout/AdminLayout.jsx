import { AppstoreOutlined, BarChartOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";

import styles from "./index.module.scss";

import { Link, Outlet } from "react-router-dom";
import { useProfile } from "../../hooks/useProfile";
import { getImageUrl } from "../../utils/image";

const { Header, Content, Sider } = Layout;

const siderStyle = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
};

const items = [
  {
    key: "1",
    icon: <BarChartOutlined />,
    label: <Link>Dashboard</Link>,
  },
  {
    key: "9",
    icon: <AppstoreOutlined />,
    label: <Link to="/admin/orders">Quản lý đơn hàng</Link>,
  },
  {
    key: "2",
    icon: <AppstoreOutlined />,
    label: <Link to="/admin/category">Quản lý danh mục</Link>,
  },
  {
    key: "3",
    icon: <AppstoreOutlined />,
    label: <Link to="/admin/product">Quản lý sản phẩm</Link>,
  },
  {
    key: "4",
    icon: <AppstoreOutlined />,
    label: <Link to="/admin/brand">Quản lý thương hiệu</Link>,
  },
  {
    key: "5",
    icon: <AppstoreOutlined />,
    label: <Link to="/admin/color">Quản lý màu sắc</Link>,
  },
  {
    key: "6",
    icon: <AppstoreOutlined />,
    label: <Link to="/admin/size">Quản lý kích thước</Link>,
  },
  {
    key: "8",
    icon: <AppstoreOutlined />,
    label: <Link to="/admin/coupon">Quản lý mã giảm giá</Link>,
  },
  {
    key: "7",
    icon: <AppstoreOutlined />,
    label: <Link to="/admin/blog">Quản lý bài viết</Link>,
  },
  {
    key: "10",
    icon: <AppstoreOutlined />,
    label: <Link to="/admin/banner">Quản lý banner</Link>,
  },
  {
    key: "11",
    icon: <AppstoreOutlined />,
    label: <Link to="/admin/contact">Quản lý liên hệ</Link>,
  },
  {
    key: "12",
    icon: <AppstoreOutlined />,
    label: <Link to="/admin/comment">Quản lý bình luận</Link>,
  },
];

const AdminLayout = () => {
  const { profile } = useProfile();

  return (
    <Layout hasSider>
      <Sider style={siderStyle} width={230}>
        <Link to="/" className={styles.logo}>
          ADMIN
        </Link>

        <Menu theme="dark" mode="inline" items={items} />
      </Sider>

      <Layout className={styles.layout}>
        <Header className={styles.header}>
          <div className={styles.profile}>
            <img
              src={profile?.avatar || "/images/avatar-default.jpg"}
              alt="Avatar"
              className={styles.avatar}
            />

            <div>
              <p className={styles.name}>{profile?.fullname}</p>
              <p className={styles.email}>{profile?.email}</p>
            </div>
          </div>
        </Header>

        <Content className={styles.content}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;

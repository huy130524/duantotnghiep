import { theme } from "antd";
import { Header } from "antd/es/layout/layout";

const HeaderAdmin = () => {
  const { token } = theme.useToken();
  const backgroundColor = token?.colorBgContainer || "#fff";

  return (
    <Header
      className="admin-header"
      style={{ padding: 0, background: backgroundColor }}
    />
  );
};

export default HeaderAdmin;

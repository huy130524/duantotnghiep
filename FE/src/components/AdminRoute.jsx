import { Navigate } from "react-router-dom";
import { useProfile } from "../hooks/useProfile";
import { useAuth } from "../hooks/useAuth";
import { Spin } from "antd";

const AdminRoute = ({ children }) => {
  const { profile } = useProfile();
  const { isLogged } = useAuth();

  if (!isLogged) {
    return <Navigate to="/login" replace />;
  }

  if (!profile) {
    return <Spin />;
  }

  if (profile?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;

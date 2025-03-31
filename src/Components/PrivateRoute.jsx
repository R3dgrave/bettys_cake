import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const PrivateRoute = () => {
  const { admin } = useAuth();
  return admin ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

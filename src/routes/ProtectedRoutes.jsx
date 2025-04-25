import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const ProtectedRoute = ({ children, role = null }) => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/auth/signin" replace />;
  }

  if (role && user.whoIs !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;

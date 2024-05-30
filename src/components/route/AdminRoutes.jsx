import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoutes = () => {
  const user = useSelector((state) => state.user);
  console.log(user);

  return user?.role === "admin" ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoutes;

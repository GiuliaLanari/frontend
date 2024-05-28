import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoutes = () => {
  const user = useSelector((state) => state.user.role);
  console.log(user);

  return user === "admin" ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoutes;

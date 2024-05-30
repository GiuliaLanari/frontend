import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ClientRoutes = () => {
  const user = useSelector((state) => state.user);
  console.log(user);

  return user?.role === "client" ? <Outlet /> : <Navigate to="/login" />;
};

export default ClientRoutes;

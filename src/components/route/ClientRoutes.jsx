import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ClientRoutes = () => {
  const user = useSelector((state) => state.user.role);
  console.log(user);

  return user === "client" ? <Outlet /> : <Navigate to="/login" />;
};

export default ClientRoutes;

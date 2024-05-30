import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./components/Home";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Product from "./components/Product";
import NotFound from "./components/NotFound";
import MyNavbar from "./components/MyNavbar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { LOGIN } from "./redux/actions";
import NewProductForm from "./components/form/NewProductForm";
import EditProductForm from "./components/form/EditProductForm";
import GuestRoutes from "./components/route/GuestRoutes";
import AdminRoutes from "./components/route/AdminRoutes";
import Review from "./components/Review";
import ClientRoutes from "./components/route/ClientRoutes";
import NewReviewForm from "./components/form/NewReviewForm";
import OrderAdmin from "./components/OrderAdmin";
import OrderClient from "./components/OrderClient";
import OrderDettail from "./components/OrderDettail";
import Cart from "./components/Cart";

function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.withXSRFToken = true;

  const dispatch = useDispatch();

  useEffect(() => {
    axios("/api/user")
      .then((res) =>
        dispatch({
          type: LOGIN,
          payload: res.data,
        })
      )
      .catch((err) => console.log(err));
    // .finally(() => setLoaded(true));
  }, []);

  return (
    <>
      <BrowserRouter>
        <MyNavbar />

        <Routes>
          {/* ROTTE PROTETTE ADMIN */}
          <Route element={<AdminRoutes />}>
            <Route path="/products/add" element={<NewProductForm />} />
            <Route path="/products/:id/edit" element={<EditProductForm />} />
            <Route path="/orders" element={<OrderAdmin />} />
            <Route path="/orders/:id" element={<OrderDettail />} />
          </Route>
          {/* ROTTE PROTETTE CLIENT */}
          <Route element={<ClientRoutes />}>
            <Route path="/reviews/:id/add" element={<NewReviewForm />} />
            <Route path="/myOrders" element={<OrderClient />} />
            <Route path="/cart" element={<Cart />} />
          </Route>

          {/*  rotte NON protette */}
          <Route element={<GuestRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* rotte accessibili a TUTTI */}
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/reviews" element={<Review />} />

          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

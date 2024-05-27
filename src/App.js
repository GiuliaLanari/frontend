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
          {/* <Route element={<ProtectedRoutes />}>
          
        </Route> */}

          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

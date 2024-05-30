import axios from "axios";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../redux/actions";

const MyNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const logout = () => {
    axios
      .post("/logout")
      .then(() => dispatch({ type: LOGOUT }))
      .then(() => navigate("/login"));
  };

  return (
    <Navbar expand="md" className="bg-body-tertiary">
      <Container>
        <Link to="/" className="nav-link">
          PlusArt
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* <Link href="#home">Home</Link>
            <Link href="#link">Link</Link> */}
            {user ? (
              <>
                <span className="nav-link me-2">
                  {user.name} {user.surname}
                </span>
                <button className="nav-link" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </>
            )}
            {/* se sei un CLIENT */}

            {user && user.role === "client" ? (
              <>
                <Link to="/cart" className="nav-link">
                  Cart
                </Link>
              </>
            ) : (
              ""
            )}

            {/* se è un ADMIN */}
            {user && user.role === "admin" ? (
              <Link to="/products/add" className="nav-link">
                Add Product
              </Link>
            ) : (
              ""
            )}
            {user && user.role === "admin" ? (
              <Link className="nav-link" to={`/orders`}>
                Orders
              </Link>
            ) : (
              ""
            )}
            {user && user.role === "client" ? (
              <Link className="nav-link" to={`/myOrders`}>
                Orders
              </Link>
            ) : (
              ""
            )}

            <Link to="/reviews" className="nav-link">
              Reviews
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;

import axios from "axios";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaOpencart } from "react-icons/fa";
import { GrNotes } from "react-icons/gr";
import { MdOutlineReviews } from "react-icons/md";
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
      .then(() => navigate("/"))
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  return (
    <Navbar expand="md" bg="dark" data-bs-theme="dark" className="text-white py-2 sticky-top">
      <Container>
        <Link to="/" className="nav-link linkHover">
          <img src={"assets/logo.png"} alt="logo" className="f-logo" />
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            {/* se sei un CLIENT */}

            {user && user.role === "client" ? (
              <>
                <Link to="/cart" className="nav-link linkHover mobile-nav-cart">
                  <FaOpencart className="f-navIcons" />
                  Cart
                </Link>
                <Link className="nav-link linkHover mobile-nav-order" to={`/myOrders`}>
                  <GrNotes className="f-navIcons" />
                  Orders
                </Link>
              </>
            ) : (
              ""
            )}

            {/* se è un ADMIN */}
            {user && user.role === "admin" ? (
              <>
                <Link to="/products/add" className="nav-link linkHover">
                  Add Product
                </Link>
                <Link className="nav-link linkHover" to={`/orders`}>
                  Orders
                </Link>
              </>
            ) : (
              ""
            )}

            <Link to="/reviews" className="nav-link linkHover">
              <MdOutlineReviews className="f-navIcons" />
              Reviews
            </Link>
          </Nav>
        </Navbar.Collapse>
        {user ? (
          <>
            <span className="nav-link me-5 mobile-nav">
              {user.name} {user.surname}
            </span>
            <button className="nav-link linkHover" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="nav-link linkHover me-4" to="/login">
              Login
            </Link>
            <Link className="nav-link linkHover" to="/register">
              Register
            </Link>
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default MyNavbar;

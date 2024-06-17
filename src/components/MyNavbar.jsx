import axios from "axios";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
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
            {/* LOGIN CLIET ⬇ */}

            {user && user.role === "client" ? (
              <>
                <Link to="/cart" className="nav-link linkHover mobile-nav-cart">
                  <img
                    width="35"
                    height="35"
                    src="https://img.icons8.com/nolan/64/add-shopping-cart.png"
                    alt="add-shopping-cart"
                    className="me-2"
                  />
                  Cart
                </Link>
                <Link className="nav-link linkHover mobile-nav-order" to={`/myOrders`}>
                  <img
                    width="35"
                    height="35"
                    src="https://img.icons8.com/nolan/64/purchase-order.png"
                    alt="purchase-order"
                    className="me-2"
                  />
                  Orders
                </Link>
              </>
            ) : (
              ""
            )}

            {/* LOGIN ADMIN */}
            {user && user.role === "admin" ? (
              <>
                <Link to="/products/add" className="nav-link linkHover">
                  <img
                    width="35"
                    height="35"
                    src="https://img.icons8.com/nolan/35/plus.png"
                    alt="plus"
                    className="me-2"
                  />
                  Product
                </Link>
                <Link className="nav-link linkHover" to={`/orders`}>
                  <img
                    width="35"
                    height="35"
                    src="https://img.icons8.com/nolan/64/purchase-order.png"
                    alt="purchase-order"
                    className="me-2"
                  />
                  Orders
                </Link>
              </>
            ) : (
              ""
            )}

            <Link to="/reviews" className="nav-link linkHover">
              <img
                width="35"
                height="35"
                src="https://img.icons8.com/nolan/64/popular-topic.png"
                alt="popular-topic"
                className="me-2"
              />
              Reviews
            </Link>
          </Nav>
          {user ? (
            <>
              <span className="nav-link me-5 mobile-nav">
                <Dropdown data-bs-theme="dark">
                  <Dropdown.Toggle
                    id="dropdown-button-dark-example1"
                    variant="secondary"
                    className="drop-nav linkHover"
                  >
                    {user.name} {user.surname}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/change-password" className="dropdown-item">
                      Change Password
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </span>
              <button className="nav-link linkHover" onClick={logout}>
                Logout
                <img
                  width="35"
                  height="35"
                  src="https://img.icons8.com/nolan/64/exit.png"
                  alt="exit"
                  className="ms-2"
                />
              </button>
            </>
          ) : (
            <>
              <Link className="nav-link linkHover me-4 p-2" to="/login">
                Login
              </Link>
              <Link className="nav-link linkHover p-2" to="/register">
                Register
              </Link>
            </>
          )}
          {/* <Link className="nav-link linkHover p-2" to="/change-password">
            Change Password
          </Link> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;

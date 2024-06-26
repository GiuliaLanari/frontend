import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    fetch("/api/v1/cart")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setCart(data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    setShowModal(true);
    setDeleteId(id);
  };

  const confirmDelete = () => {
    axios
      .delete(`/api/v1/carts/${deleteId}`)
      .then((res) => {
        setMessage("Cart deleted successfully");
        setShowModal(false);
        navigate("/");
      })
      .catch((error) => {
        setMessage("Failed to delete the cart. Please try again.");
        console.error("There was an error deleting the product in the cart!", error);
      });
  };

  const buyCart = () => {
    axios
      .post(`/api/v1/buy-carts`)
      .then((res) => {
        setMessage("Order successfully sent!");
        navigate("/myOrders");
      })
      .catch((error) => {
        console.error("Error loading the order!", error);
        navigate("/cart");
      });
  };

  return (
    <Container>
      <Row>
        <h1 className="my-5 text-center">Your cart</h1>
        {loading ? (
          <Col xs={12} md={5} className="spinnerAllPage">
            <Spinner animation="grow" />
          </Col>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            Error: {error}
          </div>
        ) : (
          <Col xs={11} md={12} className="border-order mx-auto">
            <Row className="my-3 mx-2">
              {user && cart.length > 0 && user.role === "client" ? (
                cart.map((obj) => (
                  <div key={obj.id}>
                    {obj.products.map((product) => (
                      <Col key={product.id}>
                        <Row className="justify-content-center align-items-center ">
                          <Col xs={12} md={2} className="img-cart">
                            <img src={product.picture} alt={product.title} className="w-100" />
                          </Col>
                          <Col xs={12} md={7}>
                            <p>Nome prodotto: {product.title}</p>
                            <p>Quantità: {product.pivot.quantity}</p>
                          </Col>
                        </Row>
                      </Col>
                    ))}
                    <Col className="text-end">
                      <button onClick={() => handleDelete(obj.id)} className="style-btn-delete m-btn-delete me-2">
                        <FaTrash className="me-2 align-middle" />
                        Delete all cart
                      </button>
                      <button onClick={() => buyCart()} className="style-btn">
                        Order now
                      </button>
                    </Col>
                  </div>
                ))
              ) : (
                <div>
                  <h4>
                    There are no products in your cart,
                    <Link to={"/"} className="dettails-link">
                      {" "}
                      start shopping now!
                    </Link>
                  </h4>
                </div>
              )}
            </Row>
          </Col>
        )}
      </Row>
      {message && <p className="text-center mt-4">{message}</p>}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to empty your cart?</Modal.Body>
        <Modal.Footer>
          <button className="style-btn" onClick={() => setShowModal(false)}>
            Cancel
          </button>
          <button className="style-btn-delete" onClick={confirmDelete}>
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Cart;

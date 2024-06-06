import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    fetch("/api/v1/cart")
      .then((res) => res.json())
      .then((data) => setCart(data.data));
  }, []);

  const deleteProduct = (id) => {
    axios
      .delete(`/api/v1/carts/${id}`)

      .then((res) => {
        window.location.reload();
      });
  };

  const buyCart = () => {
    axios.post(`/api/v1/buy-carts`).then((res) => {
      navigate("/myOrders");
    });
  };

  return (
    <Container>
      <Row>
        <h1 className="my-5 text-center">Your cart</h1>
        <Col className="border-order">
          <Row className="my-3 mx-2">
            {user && user.role === "client"
              ? cart.map((obj) => (
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
                      <button
                        onClick={() => {
                          deleteProduct(obj.id);
                        }}
                        className="style-btn-delete me-3"
                      >
                        <FaTrash className="me-2" />
                        Delete all cart
                      </button>
                      <button
                        onClick={() => {
                          buyCart();
                        }}
                        className="style-btn"
                      >
                        Order now
                      </button>
                    </Col>
                  </div>
                ))
              : ""}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;

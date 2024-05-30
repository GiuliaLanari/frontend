import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";

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
        navigate("/");
      });
  };

  return (
    <Container>
      <h1>Pagina carello</h1>
      {user && user.role === "client"
        ? cart.map((obj) => (
            <div key={obj.id}>
              <p>Id ordine: {obj.id}</p>
              {obj.products.map((product) => (
                <div key={product.id}>
                  <p>Nome prodotto: {product.title}</p>
                  <p>Quantità: {product.pivot.quantity}</p>
                </div>
              ))}
              <Button
                onClick={() => {
                  deleteProduct(obj.id);
                }}
                variant="danger mx-1"
              >
                Delete
              </Button>
            </div>
          ))
        : ""}
    </Container>
  );
};

export default Cart;

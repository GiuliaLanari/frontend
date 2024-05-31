import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const OrderAdmin = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.user);
  // const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/v1/orders`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.data);
      });
  }, []);

  const deleteProduct = (id) => {
    axios
      .delete(`/api/v1/orders/${id}`)

      .then((res) => {
        window.location.reload("/orders");
      });
  };

  return (
    <Container>
      {user && user.role === "admin"
        ? orders.map((order) => (
            <div key={order.id}>
              <h4>Ordine id: {order.id}</h4>
              <p>
                Totale Ordine:{" "}
                {order.products.reduce((total, product) => total + product.pivot.price * product.pivot.quantity, 0)}
              </p>
              {order.products.map((product) => (
                <div key={product.id}>
                  <p>Nome prodotto: {product.title}</p>
                  <p>Quantità: {product.pivot.quantity}</p>
                </div>
              ))}
              <Link to={`/orders/${order.id}`}>Dettagli</Link>
              <Button
                onClick={() => {
                  deleteProduct(order.id);
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

export default OrderAdmin;

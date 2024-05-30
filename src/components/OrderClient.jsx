import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

const OrderClient = () => {
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`/api/v1/orders`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.data);
      });
  }, []);

  return (
    <Container>
      {user && user.role === "client"
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
            </div>
          ))
        : "Non ci sono ordini"}
    </Container>
  );
};

export default OrderClient;

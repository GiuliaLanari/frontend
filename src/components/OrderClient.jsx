import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
      <Row className="my-5">
        <Col>
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
        </Col>
      </Row>
    </Container>
  );
};

export default OrderClient;

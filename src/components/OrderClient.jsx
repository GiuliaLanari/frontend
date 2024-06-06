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
      <Row>
        {user && user.role === "client"
          ? orders.map((order) => (
              <Col xs={12} md={4} key={order.id} className="border-order mx-auto my-5">
                <div className="border-order2">
                  <div>
                    <h4>Order code: {order.id}</h4>

                    {order.products.map((product) => (
                      <div key={product.id}>
                        <p>Name Product: {product.title}</p>
                        <p>Quantity: {product.pivot.quantity}</p>
                      </div>
                    ))}
                  </div>
                  <div className="d-flex  justify-content-end ">
                    <p className="tot-order">
                      Tot Order: £{" "}
                      {order.products.reduce(
                        (total, product) => total + product.pivot.price * product.pivot.quantity,
                        0
                      )}
                    </p>
                  </div>
                </div>
              </Col>
            ))
          : "Non ci sono ordini"}
      </Row>
    </Container>
  );
};

export default OrderClient;

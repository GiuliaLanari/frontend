import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const OrderDettail = () => {
  const [order, setOrder] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/v1/orders/${id}`)
      .then((res) => {
        if (!res.ok) navigate("/404");
        return res.json();
      })
      .then((data) => setOrder(data.data));
  }, [id]);

  return (
    order && (
      <Container>
        <Row>
          <Col xs={12} className="my-5">
            <h1>Order code:{order.id}</h1>
            <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
            <p>
              Client: {order.user.name} {order.user.surname}
            </p>
            <p>Email: {order.user.email}</p>

            {order.products.map((product) => (
              <div key={product.id}>
                <p>Name product: {product.title}</p>
                <p>Qantity: {product.pivot.quantity}</p>
              </div>
            ))}
            <p>
              Tot order: £{" "}
              {order.products.reduce((total, product) => total + product.pivot.price * product.pivot.quantity, 0)}
            </p>
          </Col>
        </Row>
      </Container>
    )
  );
};

export default OrderDettail;

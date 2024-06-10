import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const OrderDettail = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    fetch(`/api/v1/orders/${id}`)
      // .then((res) => {
      //   if (!res.ok) navigate("/404");
      //   return res.json();
      // })
      // .then((data) => setOrder(data.data));
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setOrder(data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
        navigate("/404");
      });
  }, [id]);

  return (
    // order && (
    <Container>
      {loading ? (
        <Spinner animation="grow" className="mx-auto mt-5" />
      ) : error ? (
        <div class="alert alert-danger mt-5" role="alert">
          Error: {error}
        </div>
      ) : (
        order && (
          <Row>
            <Col xs={11} md={7} className="border-order my-5 mx-auto">
              <div className="border-order2">
                <h1 className="num-order">Order code: {order.id}</h1>
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
                <div>
                  <p className="tot-order">
                    Tot order: £{" "}
                    {order.products.reduce((total, product) => total + product.pivot.price * product.pivot.quantity, 0)}
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        )
      )}
    </Container>
  );
  // );
};

export default OrderDettail;

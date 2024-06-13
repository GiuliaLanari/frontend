import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const OrderClient = () => {
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`/api/v1/orders`)
      // .then((res) => res.json())
      // .then((data) => {
      //   setOrders(data.data);
      // });
      .then((res) => {
        if (!res.ok) {
          setMessage("Error loading the order!");
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setOrders(data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <Container className=" d-flex flex-column justify-content-center">
      {loading ? (
        <Spinner animation="grow" className="mx-auto mt-5" />
      ) : error ? (
        <div class="alert alert-danger mt-3" role="alert">
          Error: {error}
        </div>
      ) : (
        <Row className="justify-content-around">
          {user && user.role === "client"
            ? orders.map((order) => (
                <Col xs={11} md={4} key={order.id} className="border-order mx-2 my-5">
                  <div className="border-order2">
                    <div>
                      <h4 className="num-order">Order code: {order.id}</h4>

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
      )}
      {message && <p className="text-center mt-4">{message}</p>}
    </Container>
  );
};

export default OrderClient;

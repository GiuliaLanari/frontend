import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const OrderAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    fetch(`/api/v1/orders`)
      // .then((res) => res.json())
      // .then((data) => {
      //   setOrders(data.data);
      // });
      .then((res) => {
        if (!res.ok) {
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

  const deleteProduct = (id) => {
    axios
      .delete(`/api/v1/orders/${id}`)

      .then((res) => {
        setMessage("Order deleted successfully");
        // window.location.reload("/orders");
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <Container className=" d-flex flex-column justify-content-center">
      {loading ? (
        <Spinner animation="grow" className="mx-auto mt-5" />
      ) : error ? (
        <div class="alert alert-danger" role="alert">
          Error: {error}
        </div>
      ) : (
        <Row className="justify-content-around">
          {user && user.role === "admin"
            ? orders.map((order) => (
                <Col xs={11} md={4} key={order.id} className="border-order my-5 mx-2">
                  <div className="border-order2">
                    <div>
                      <h4 className="num-order">Order code: {order.id}</h4>
                      {order.products.map((product) => (
                        <div key={product.id}>
                          <p>Name Product: {product.title}</p>
                          <p>Quantity: {product.pivot.quantity}</p>
                        </div>
                      ))}

                      <p className="tot-order">
                        Tot Order: £{" "}
                        {order.products.reduce(
                          (total, product) => total + product.pivot.price * product.pivot.quantity,
                          0
                        )}
                      </p>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <Link to={`/orders/${order.id}`} className="dettails-link">
                        Dettails
                      </Link>
                      <button
                        onClick={() => {
                          deleteProduct(order.id);
                        }}
                        className="style-btn-delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </Col>
              ))
            : ""}
        </Row>
      )}
      {message && <p className="text-center mt-4">{message}</p>}
    </Container>
  );
};

export default OrderAdmin;

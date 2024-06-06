import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FaTrash } from "react-icons/fa";

const OrderAdmin = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.user);

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
      <Row>
        {user && user.role === "admin"
          ? orders.map((order) => (
              <Col xs={12} md={4} key={order.id} className="border-order my-5 mx-auto">
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
                    <Button
                      onClick={() => {
                        deleteProduct(order.id);
                      }}
                      className="style-btn-delete"
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </div>
              </Col>
            ))
          : ""}
      </Row>
    </Container>
  );
};

export default OrderAdmin;

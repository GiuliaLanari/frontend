// import axios from "axios";
// import { useState } from "react";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { FaTrash } from "react-icons/fa";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";

// const Cart = () => {
//   const [cart, setCart] = useState([]);
//   const navigate = useNavigate();

//   const user = useSelector((state) => state.user);

//   useEffect(() => {
//     fetch("/api/v1/cart")
//       .then((res) => res.json())
//       .then((data) => setCart(data.data))
//       .catch((error) => {
//         console.error("Error fetching cart:", error);
//       });
//   }, []);

//   const deleteProduct = (id) => {
//     axios
//       .delete(`/api/v1/carts/${id}`)

//       .then((res) => {
//         window.location.reload();
//       })
//       .catch((error) => {
//         console.error("Error deleting product:", error);
//         // Optionally, handle the error, e.g., show a notification to the user
//       });
//   };

//   const buyCart = () => {
//     axios
//       .post(`/api/v1/buy-carts`)
//       .then((res) => {
//         navigate("/myOrders");
//       })
//       .catch((error) => {
//         console.error("Error buying cart:", error);
//         // Optionally, handle the error, e.g., show a notification to the user
//       });
//   };

//   return (
//     <Container>
//       <Row>
//         <h1 className="my-5 text-center">Your cart</h1>
//         <Col className="border-order">
//           <Row className="my-3 mx-2">
//             {user && user.role === "client"
//               ? cart.map((obj) => (
//                   <div key={obj.id}>
//                     {obj.products.map((product) => (
//                       <Col key={product.id}>
//                         <Row className="justify-content-center align-items-center ">
//                           <Col xs={12} md={2} className="img-cart">
//                             <img src={product.picture} alt={product.title} className="w-100" />
//                           </Col>
//                           <Col xs={12} md={7}>
//                             <p>Nome prodotto: {product.title}</p>
//                             <p>Quantità: {product.pivot.quantity}</p>
//                           </Col>
//                         </Row>
//                       </Col>
//                     ))}
//                     <Col className="text-end">
//                       <button
//                         onClick={() => {
//                           deleteProduct(obj.id);
//                         }}
//                         className="style-btn-delete me-3"
//                       >
//                         <FaTrash className="me-2" />
//                         Delete all cart
//                       </button>
//                       <button
//                         onClick={() => {
//                           buyCart();
//                         }}
//                         className="style-btn"
//                       >
//                         Order now
//                       </button>
//                     </Col>
//                   </div>
//                 ))
//               : ""}
//           </Row>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Cart;

import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    fetch("/api/v1/cart")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setCart(data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const deleteProduct = (id) => {
    axios
      .delete(`/api/v1/carts/${id}`)
      .then((res) => {
        setMessage("Cart deleted successfully");
        window.location.reload();
      })
      .catch((error) => {
        setMessage("Failed to delete the cart. Please try again.");
        console.error("There was an error deleting the product in the cart!", error);
      });
  };

  const buyCart = () => {
    axios
      .post(`/api/v1/buy-carts`)
      .then((res) => {
        setMessage("Order successfully sent!");
        navigate("/myOrders");
      })
      .catch((error) => {
        setMessage("Order not entered. Please try again.");
        console.error("Error loading the order!", error);
      });
  };

  return (
    <Container>
      <Row>
        <h1 className="my-5 text-center">Your cart</h1>
        {loading ? (
          <Spinner animation="grow" className="mx-auto mt-5" />
        ) : error ? (
          <div class="alert alert-danger" role="alert">
            Error: {error}
          </div>
        ) : (
          <Col className="border-order">
            <Row className="my-3 mx-2">
              {user && user.role === "client"
                ? cart.map((obj) => (
                    <div key={obj.id}>
                      {obj.products.map((product) => (
                        <Col key={product.id}>
                          <Row className="justify-content-center align-items-center ">
                            <Col xs={12} md={2} className="img-cart">
                              <img src={product.picture} alt={product.title} className="w-100" />
                            </Col>
                            <Col xs={12} md={7}>
                              <p>Nome prodotto: {product.title}</p>
                              <p>Quantità: {product.pivot.quantity}</p>
                            </Col>
                          </Row>
                        </Col>
                      ))}
                      <Col className="text-end">
                        <button
                          onClick={() => {
                            deleteProduct(obj.id);
                          }}
                          className="style-btn-delete me-3"
                        >
                          <FaTrash className="me-2" />
                          Delete all cart
                        </button>
                        <button
                          onClick={() => {
                            buyCart();
                          }}
                          className="style-btn"
                        >
                          Order now
                        </button>
                      </Col>
                    </div>
                  ))
                : ""}
            </Row>
          </Col>
        )}
      </Row>
      {message && <p className="text-center mt-4">{message}</p>}
    </Container>
  );
};

export default Cart;

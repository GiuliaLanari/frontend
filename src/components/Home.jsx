import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const user = useSelector((state) => state.user);

  // const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/v1/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      // .then((data) => setProducts(data.data));
      .then((data) => {
        setProducts(data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const deleteProduct = (id) => {
    axios
      .delete(`/api/v1/products/${id}`)

      .then((res) => {
        setMessage("Product deleted successfully");
        window.location.reload("/");
      })
      .catch((error) => {
        setMessage("Failed to delete the product. Please try again.");
        console.error("There was an error deleting the product!", error);
      });
  };

  const addCart = (id) => {
    axios
      .post(`/api/v1/carts/${id}/add`)
      // .then((res) => setCart(res));
      .then((res) => {
        setCart("Add to cart successfully!");
      })
      .catch((error) => {
        setMessage("Product not add to cart. Please try again.");
        console.error("Error loading the product!", error);
      });
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={12} className="bg-home py-4">
          <h1 className=" text ">PlusArt</h1>
        </Col>
        {loading ? (
          <Spinner animation="grow" className="mx-auto mt-5" />
        ) : error ? (
          <div class="alert alert-danger mt-5" role="alert">
            Error: {error}
          </div>
        ) : (
          <Col xs={12}>
            <Row className="my-5">
              {products.map((product) => (
                <Col xs={12} md={4} className="text-center my-2 py-4" key={product.id}>
                  <div className="box-img p-4">
                    <h2>{product.title}</h2>
                    <div className="zoom-wrapper">
                      <img
                        src={process.env.REACT_APP_BACKEND_URL + "/" + product.picture}
                        alt={product.title}
                        className="w-50"
                      />
                    </div>
                    <div className="d-flex flex-column align-items-center">
                      <Link to={`/products/${product.id}`} className="dettails-link">
                        Details
                      </Link>

                      {user && user.role === "client" ? (
                        <button
                          onClick={() => {
                            addCart(product.id);
                          }}
                          className="style-btn my-3"
                        >
                          Add to cart
                        </button>
                      ) : (
                        ""
                      )}

                      {user && user.role === "client" ? (
                        <Link className="dettails-link" to={`/reviews/${product.id}/add`}>
                          Add review
                        </Link>
                      ) : (
                        ""
                      )}

                      {/* questi nel caso è un amministratore ⬇*/}
                      {user && user.role === "admin" ? (
                        <div>
                          <button
                            onClick={() => {
                              deleteProduct(product.id);
                            }}
                            className="mx-1 my-3 style-btn-delete"
                          >
                            <FaTrash />
                          </button>
                          <Link to={`/products/${product.id}/edit`} className="style-btn">
                            <FaPen className="text-white" />
                          </Link>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        )}
      </Row>
      {message && <p className="text-center mt-4">{message}</p>}
    </Container>
  );
};

export default Home;

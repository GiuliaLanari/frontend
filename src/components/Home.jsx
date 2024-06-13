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
import Carousel from "react-bootstrap/Carousel";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const user = useSelector((state) => state.user);

  useEffect(() => {
    fetch("/api/v1/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
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
      .then((res) => {
        setCart("Add to cart successfully!");
      })
      .catch((error) => {
        setMessage("Product not add to cart. Please try again.");
        console.error("Error loading the product!", error);
      });
  };

  return (
    <Container fluid className=" d-flex flex-column justify-content-center">
      {loading ? (
        <Spinner animation="grow" className="mx-auto mt-5" />
      ) : error ? (
        <div class="alert alert-danger mt-5" role="alert">
          Error: {error}
        </div>
      ) : (
        <Row className="justify-content-evenly">
          <Col xs={12} className="bg-home py-4">
            <h1 className=" text ">PlusArt</h1>
          </Col>
          <Col xs={12} className="free-giftBox">
            <div>
              <img
                width="64"
                height="64"
                src="https://img.icons8.com/nolan/64/1A6DFF/C822FF/packaging.png"
                alt="packaging"
                className="me-5"
              />
              <h4> Free gift box with order over £ 30</h4>
            </div>
          </Col>
          <Col xs={12}>
            <Row className="my-5">
              {products.map((product) => (
                <Col xs={12} md={4} lg={3} className="text-center my-2 py-4" key={product.id}>
                  <div className="box-img p-4">
                    <h2>{product.title}</h2>
                    <div className="zoom-wrapper">
                      <Link to={`/products/${product.id}`}>
                        <img
                          src={process.env.REACT_APP_BACKEND_URL + "/" + product.picture}
                          alt={product.title}
                          className="w-50"
                        />
                      </Link>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                      <div className="cart-container">
                        <p className="price">£ {product.price}</p>
                        {!user || (user.role !== "client" && user.role !== "admin") ? (
                          <div className="ms-5 zoom-wrapper">
                            <Link to={"/login"}>
                              <img
                                width="67"
                                height="67"
                                src="https://img.icons8.com/external-flat-icons-inmotus-design/67/external-Buy-Now-label-flat-icons-inmotus-design.png"
                                alt="external-Buy-Now-label-flat-icons-inmotus-design"
                              />
                            </Link>
                          </div>
                        ) : (
                          ""
                        )}

                        {user && user.role === "client" ? (
                          <button
                            onClick={() => {
                              addCart(product.id);
                            }}
                            className="cart-btn "
                          >
                            <img
                              width="40"
                              height="40"
                              src="https://img.icons8.com/nolan/64/add-shopping-cart.png"
                              alt="add-shopping-cart"
                            />
                          </button>
                        ) : (
                          ""
                        )}
                      </div>

                      {user && user.role === "client" ? (
                        <Link className="dettails-link" to={`/reviews/${product.id}/add`}>
                          <img
                            width="30"
                            height="30"
                            src="https://img.icons8.com/nolan/64/add-to-favorites.png"
                            alt="add-to-favorites"
                            className="me-1"
                          />
                          review
                        </Link>
                      ) : (
                        ""
                      )}

                      {/* LOGIN ADMIN ⬇*/}
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
          <Col xs={11} md={5}>
            <video
              src={"/assets/publicity/summer-collection.mp4"}
              autoPlay
              muted
              loop
              type="video/mp4"
              className="w-100 h-100 m-0"
            />
          </Col>
          <Col xs={11} md={6} className="bg-info p-0">
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100 object-fit-cover"
                  src={"/assets/publicity/publicity-1.webp"}
                  alt="T-shirt"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100 object-fit-cover"
                  src={"/assets/publicity/publicity-2.jpeg"}
                  alt="T-shirt"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100 object-fit-cover"
                  src={"/assets/publicity/publicity-3.webp"}
                  alt="T-shirt"
                />
              </Carousel.Item>
            </Carousel>
            <div className="carosel-text">
              <p>New collection</p>
            </div>
          </Col>
        </Row>
      )}

      {message && <p className="text-center mt-4">{message}</p>}
    </Container>
  );
};

export default Home;

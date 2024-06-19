import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const Product = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`/api/v1/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        return res.json();
      })
      .then((data) => {
        setLoading(false);
        setProduct(data.data);
      })
      .catch((error) => {
        setLoading(false);
        navigate("/404");
      });
  }, [id]);

  const addCart = (id) => {
    axios
      .post(`/api/v1/carts/${id}/add`)
      .then((res) => {
        setCart("Add to cart successfully!");
        window.alert("Add to cart successfully!");
      })
      .catch((error) => {
        setMessage("Product not add to cart. Please try again.");
        console.error("Error loading the product!", error);
      });
  };

  return (
    <div className=" d-flex flex-column justify-content-center">
      <Container fluid>
        <Row>
          <Col xs={12} className="free-giftBox mb-5">
            <div>
              <img
                width="64"
                height="64"
                src="https://img.icons8.com/nolan/64/1A6DFF/C822FF/packaging.png"
                alt="packaging"
              />
              <h4> Free gift box with order over £ 30</h4>
            </div>
          </Col>
        </Row>
      </Container>
      {loading ? (
        <Spinner animation="grow" className="mx-auto mt-5 " />
      ) : (
        product && (
          <Container>
            <Row>
              <Col xs={12}>
                <Row>
                  <Col xs={12} md={5} className="zoom-wrapper">
                    <img
                      src={process.env.REACT_APP_BACKEND_URL + "/" + product.picture}
                      alt={product.title}
                      className="w-100"
                    />
                  </Col>
                  <Col xs={12} md={7}>
                    <h1 className="mt-4">{product.title}</h1>
                    <p>
                      {" "}
                      <span className="fw-bold ">Description: </span> {product.description}
                    </p>
                    <p>
                      <span className="fw-bold">Published date: </span>
                      {new Date(product.created_at).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="fw-bold me-4">Price: </span>
                      <span className="price"> £ {product.price}</span>
                    </p>
                    <p>
                      <span className="fw-bold me-4">Category: </span>
                      <span className="price"> {product.category.name}</span>
                    </p>

                    <div className="d-flex align-items-baseline">
                      <p className="fw-bold me-4">Sizes available: </p>
                      <Form.Select aria-label="Default select example" className="t-shirt-size ">
                        <option>one size</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                      </Form.Select>
                    </div>

                    {user && user.role === "client" ? (
                      <div>
                        <div>
                          <button
                            onClick={() => {
                              addCart(product.id);
                            }}
                            className="cart-btn mt-2 mb-4"
                          >
                            <img
                              width="40"
                              height="40"
                              src="https://img.icons8.com/nolan/64/add-shopping-cart.png"
                              alt="add-shopping-cart"
                            />
                          </button>
                        </div>

                        <Link className="dettails-link" to={`/reviews/${product.id}/add`}>
                          <img
                            width="30"
                            height="30"
                            src="https://img.icons8.com/nolan/64/add-to-favorites.png"
                            alt="add-to-favorites"
                            className="me-1 ms-3"
                          />
                          review
                        </Link>
                      </div>
                    ) : (
                      ""
                    )}
                  </Col>
                  <h5 className="mt-5 fw-bold">Reviews:</h5>
                  <Col xs={11} md={6}>
                    {product.reviews.map((review) => (
                      <div className="review-border" key={review.id}>
                        <p>
                          <FaUserCircle className="f-navIcons" />
                          {review.user.name} {review.user.surname}{" "}
                        </p>
                        <p>Rating: {review.rating}</p>
                        <p>Comment: {review.comment}</p>
                      </div>
                    ))}
                  </Col>
                  <Col xs={11} md={5}>
                    <video
                      src={"/assets/publicity.mp4"}
                      autoPlay
                      muted
                      loop
                      type="video/mp4"
                      className="w-100 mx-auto"
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        )
      )}
    </div>
  );
};

export default Product;

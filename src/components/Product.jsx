import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Product = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
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
  console.log(product);

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
                    <h1>{product.title}</h1>
                    <p>
                      {" "}
                      <span className="fw-bold">Description: </span> {product.description}
                    </p>
                    <p>
                      <span className="fw-bold">Published date: </span>
                      {new Date(product.created_at).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="fw-bold">Size:</span> XL
                    </p>
                    <p>
                      <span className="fw-bold">Category:</span> {product.category.name}
                    </p>
                    <p>
                      <span className="fw-bold">Price:</span> £ {product.price}
                    </p>
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

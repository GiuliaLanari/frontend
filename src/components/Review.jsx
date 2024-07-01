import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";

const Review = () => {
  const user = useSelector((state) => state.user);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/v1/reviews")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
        navigate("/404");
      });
  }, []);

  const deleteProduct = (id) => {
    axios
      .delete(`/api/v1/reviews/${id}`)

      .then((res) => {
        setMessage("Review deleted successfully");
        window.location.reload("/reviews");
      })
      .catch((error) => {
        setMessage("Failed to delete the review. Please try again.");
        console.error("There was an error deleting the product in the cart!", error);
      });
  };

  return (
    <Container>
      <Row>
        <h1 className="my-5 text-center">Reviews Productes</h1>
        {loading ? (
          <Col xs={12} md={5} className="spinnerAllPage">
            <Spinner animation="grow" />
          </Col>
        ) : error ? (
          <div class="alert alert-danger" role="alert">
            Error: {error}
          </div>
        ) : (
          <>
            <Col xs={12}>
              <Row>
                {reviews.map((review) => (
                  <Col xs={10} md={4} lg={3} key={review.id} className="my-4 mx-auto">
                    <div className="review-border h-100">
                      <p>
                        <FaUserCircle className="f-navIcons" /> {review.user.name}
                      </p>
                      <img src={review.product.picture} alt={review.product.title} />
                      <h6>
                        <span className="fw-bold"> Product:</span> {review.product.title}
                      </h6>
                      <p>
                        {" "}
                        <span className="fw-bold">Rating:</span> {review.rating}
                      </p>
                      <p>
                        {" "}
                        <span className="fw-bold">Comment:</span> {review.comment}
                      </p>
                      {user && user.name === review.user.name ? (
                        <div className="text-end">
                          {" "}
                          <Button
                            onClick={() => {
                              deleteProduct(review.id);
                            }}
                            variant="danger ms-auto"
                          >
                            <FaTrash />
                          </Button>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
          </>
        )}
      </Row>
      {message && <p className="text-center mt-4">{message}</p>}
    </Container>
  );
};

export default Review;

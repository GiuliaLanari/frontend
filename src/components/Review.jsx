import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import axios from "axios";

const Review = () => {
  const user = useSelector((state) => state.user);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  // const navigate = useNavigate();

  console.log(reviews);
  useEffect(() => {
    fetch("/api/v1/reviews")
      // .then((res) => res.json())
      // .then((data) => setReviews(data));
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
          <Spinner animation="grow" className="mx-auto mt-5" />
        ) : error ? (
          <div class="alert alert-danger" role="alert">
            Error: {error}
          </div>
        ) : (
          <Col xs={12}>
            <Table striped bordered hover>
              <thead className="text-center ">
                <tr>
                  <th>User Name</th>
                  <th>Title product</th>
                  <th>Rating</th>
                  <th>Comment</th>
                  {user && user.name ? <th>Delete</th> : ""}
                </tr>
              </thead>
              <tbody className="t-review">
                {reviews.map((review) => (
                  <tr key={review.id}>
                    <td>{review.user.name}</td>
                    <td>{review.product.title}</td>
                    <td>{review.rating}</td>
                    <td>{review.comment}</td>
                    {user && user.name === review.user.name ? (
                      <td>
                        {" "}
                        <Button
                          onClick={() => {
                            deleteProduct(review.id);
                          }}
                          variant="danger mx-1"
                        >
                          <FaTrash className="me-2" />
                          Delete
                        </Button>
                      </td>
                    ) : (
                      ""
                    )}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        )}
      </Row>
      {message && <p className="text-center mt-4">{message}</p>}
    </Container>
  );
};

export default Review;

import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import axios from "axios";

const Review = () => {
  const user = useSelector((state) => state.user);
  const [reviews, setReviews] = useState([]);
  // const navigate = useNavigate();

  console.log(reviews);
  useEffect(() => {
    fetch("/api/v1/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  const deleteProduct = (id) => {
    axios
      .delete(`/api/v1/reviews/${id}`)

      .then((res) => {
        window.location.reload("/reviews");
      });
  };

  return (
    <Container>
      <Row>
        <h1 className="my-5 text-center">Reviews Productes</h1>
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
      </Row>
    </Container>
  );
};

export default Review;

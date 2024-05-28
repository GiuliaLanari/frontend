import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import axios from "axios";

const Review = () => {
  const user = useSelector((state) => state.user);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

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
        navigate("/reviews");
      });
  };

  return (
    <Container>
      <h1>Pagina recensioni</h1>
      {user ? (
        <Link className="nav-link" to="/reviews/add">
          Add review
        </Link>
      ) : (
        ""
      )}

      <Table striped bordered hover>
        <thead className="text-center">
          <tr>
            <th>User Name</th>
            <th>Title product</th>
            <th>Rating</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
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
    </Container>
  );
};

export default Review;

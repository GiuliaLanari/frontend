import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const NewReviewForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    rating: "",
    comment: "",
    // product_id: "",
    // user_id: "",
  });

  const updateInputValue = (ev) => {
    setFormData((oldFormData) => ({
      ...oldFormData,
      [ev.target.name]: ev.target.value,
    }));
  };

  const submitLogin = (ev) => {
    ev.preventDefault();

    axios
      .get("/sanctum/csrf-cookie")
      .then(() => axios.post(`/api/v1/reviews/${id}/add`, formData))
      .then((res) => {
        navigate("/reviews");
      });
  };

  return (
    <Container>
      <Row>
        <Col xs={12} md={5} className="mx-auto my-5">
          <h1>New review</h1>
          {/* <form onSubmit={(ev) => submitLogin(ev)} noValidate>
            <div className="mb-3">
              <label htmlFor="rating" className="form-label">
                Rating
              </label>
              <input
                type="number"
                className="form-control"
                id="rating"
                name="rating"
                onChange={(ev) => updateInputValue(ev)}
                value={formData.rating}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="comment" className="form-label">
                Comment
              </label>
              <input
                type="comment"
                className="form-control"
                id="comment"
                name="comment"
                onChange={(ev) => updateInputValue(ev)}
                value={formData.comment}
              />
            </div>
            <div className="d-flex justify-content-center mt-5">
              <button type="submit" className="btn style-btn">
                Add new Review
              </button>
            </div>
          </form> */}
          <Form noValidate onSubmit={(ev) => submitLogin(ev)}>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="rating">
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Rating"
                  // id="rating"
                  name="rating"
                  onChange={(ev) => updateInputValue(ev)}
                  value={formData.rating}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="12" controlId="comment">
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Comment"
                  // id="comment"
                  name="comment"
                  onChange={(ev) => updateInputValue(ev)}
                  value={formData.comment}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <div className="d-flex justify-content-center mt-5">
              <button type="submit" className="style-btn">
                Add review
              </button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default NewReviewForm;

import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

const NewReviewForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState(false);

  const [formData, setFormData] = useState({
    rating: "",
    comment: "",
  });

  const updateInputValue = (ev) => {
    setFormData((oldFormData) => ({
      ...oldFormData,
      [ev.target.name]: ev.target.value,
    }));
  };

  const submitLogin = (ev) => {
    ev.preventDefault();
    setLoading(true);

    axios
      .get("/sanctum/csrf-cookie")
      .then(() => axios.post(`/api/v1/reviews/${id}/add`, formData))
      .then((res) => {
        setLoading(false);
        setError(false);
        navigate("/reviews");
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
        setAlert(false);
      });
  };

  return (
    <Container className="bg-login">
      <Row>
        {error === true && (
          <Alert variant="danger" onClose={() => setAlert(false)} dismissible className="mt-5">
            <Alert.Heading>The review has not been published. Try again!</Alert.Heading>
          </Alert>
        )}

        {alert === true && (
          <Alert variant="success" onClose={() => setAlert(false)} dismissible className="mt-5">
            <Alert.Heading>The review has been successfully published!</Alert.Heading>
          </Alert>
        )}

        {loading ? (
          <Spinner animation="grow" className="mx-auto mt-5" />
        ) : (
          <Col xs={12} md={5} className="mx-auto my-5 form-container">
            <h1>New review</h1>
            <Form noValidate onSubmit={(ev) => submitLogin(ev)}>
              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="rating">
                  <Form.Label>Rating (0 to 5)</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    placeholder="Rating"
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
        )}
      </Row>
    </Container>
  );
};

export default NewReviewForm;

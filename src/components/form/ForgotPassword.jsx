import { useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/forgot-password", { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <Container className="bg-editProfile">
      <Row>
        <Col xs={11} md={6} className="mx-auto my-5 form-editProfile">
          <Form noValidate onSubmit={(ev) => handleSubmit(ev)}>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="yourEmail">
                <Form.Label>Your Email:</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Email"
                  name="yourEmail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <div className="d-flex justify-content-center mt-5">
              <button type="submit" className="style-btn">
                Submit
              </button>
            </div>
          </Form>

          {message && <p className="mt-4">{message}</p>}
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;

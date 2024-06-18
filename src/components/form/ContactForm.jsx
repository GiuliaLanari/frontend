import { useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    variant: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/v1/send-email", formData);
      setAlert({
        show: true,
        message: response.data.message,
        variant: "success",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      setAlert({
        show: true,
        message: "Error while sending email.",
        variant: "danger",
      });
    }
  };

  return (
    <Container className="bg-contact">
      <Row>
        <Col xs={11} md={5} className="mx-auto my-5 form-container">
          <h2 className="text-center my-5">Contact us</h2>
          <Form noValidate onSubmit={(ev) => handleSubmit(ev)}>
            {alert.show && (
              <Alert variant={alert.variant} onClose={() => setAlert({ show: false })} dismissible>
                {alert.message}
              </Alert>
            )}
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="name">
                <Form.Label> Full name </Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="12" controlId="email">
                <Form.Label> Email address</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="12" controlId="message">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  rows={3}
                  placeholder="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <div className="d-flex justify-content-center mt-5">
              <button type="submit" className="style-btn">
                Send email
              </button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactForm;

import { useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const UpdateEmail = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "/api/v1/update-email",
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error updating email");
    }
  };

  return (
    <Container className="bg-editProfile">
      <Row>
        <Col xs={11} md={5} className="mx-auto my-5 form-editProfile">
          <h2 className=" text-center mb-4">New Email</h2>

          <Form noValidate onSubmit={(ev) => handleSubmit(ev)}>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="newEmail">
                <Form.Label>New Email:</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="New Email"
                  name="newEmail"
                  value={email}
                  onChange={handleEmailChange}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <div className="d-flex justify-content-center mt-5">
              <button type="submit" className="style-btn">
                Update Email
              </button>
            </div>
          </Form>

          {message && <p className="mt-4">{message}</p>}
        </Col>
      </Row>
    </Container>
    // <form onSubmit={handleSubmit}>
    //   <label>
    //     New Email:
    //     <input type="email" value={email} onChange={handleEmailChange} required />
    //   </label>
    //   <button type="submit">Update Email</button>
    //   {message && <p>{message}</p>}
    // </form>
  );
};

export default UpdateEmail;

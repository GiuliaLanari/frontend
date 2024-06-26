import { useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const ChangeNameSurname = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("/api/v1/update-profile", { name, surname });
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <Container className="bg-editProfile">
      <Row>
        <Col xs={11} md={5} className="mx-auto my-5 form-editProfile">
          <h2 className="text-center mb-4">Edit profile</h2>

          <Form noValidate onSubmit={(ev) => handleSubmit(ev)}>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="newName">
                <Form.Label>New name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="New name"
                  name="newName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="12" controlId="newSurname">
                <Form.Label>New surname</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="New Surname"
                  name="newSurname"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <div className="d-flex justify-content-center mt-5">
              <button type="submit" className="style-btn">
                Update Profil
              </button>
            </div>
          </Form>

          {message && <p className="mt-4">{message}</p>}
        </Col>
      </Row>
    </Container>
  );
};

export default ChangeNameSurname;

import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

function ResetPassword() {
  const { token } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/v1/password-reset", {
        token,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      setMessage("Successfully changing your password.");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setMessage("Reset failed or another error occurred.");
    }
  };

  return (
    <Container className="bg-editProfile">
      <Row>
        <Col xs={11} md={6} className="mx-auto my-5 form-editProfile">
          <h2>Reset Password</h2>
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
              <Form.Group as={Col} md="12" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="12" controlId="password_confirmation">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Password Confirmation"
                  name="password_confirmation"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
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

    // <div>
    //   <h2>Reset Password</h2>
    //   <form onSubmit={handleSubmit}>
    //     <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
    //     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
    //     <input
    //       type="password"
    //       value={passwordConfirmation}
    //       onChange={(e) => setPasswordConfirmation(e.target.value)}
    //       required
    //     />
    //     <button type="submit">Reset Password</button>
    //   </form>
    //   {message && <p>{message}</p>}
    // </div>
  );
}

export default ResetPassword;

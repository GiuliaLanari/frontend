import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { LOGIN } from "../redux/actions";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const Register = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState(null);

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
      .then(() => axios.post("/register", formData))
      .then(() => axios.get("/api/user"))
      .then((res) => {
        dispatch({
          type: LOGIN,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        setErrors(err.response.data.errors);
      });
  };

  return (
    <Container className="bg-login">
      <Row>
        {errors && (
          <div className="alert alert-danger mt-4">
            {Object.keys(errors).map((key) => (
              <div key={key}>{errors[key]}</div>
            ))}
          </div>
        )}

        <Col xs={11} md={5} className="mx-auto my-5 form-container">
          <h1>Register</h1>

          <Form noValidate onSubmit={(ev) => submitLogin(ev)}>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="name">
                <Form.Label> Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Name"
                  name="name"
                  onChange={(ev) => updateInputValue(ev)}
                  value={formData.name}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="12" controlId="surname">
                <Form.Label> Surname</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Surname"
                  name="surname"
                  onChange={(ev) => updateInputValue(ev)}
                  value={formData.surname}
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
                  onChange={(ev) => updateInputValue(ev)}
                  value={formData.email}
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
                  onChange={(ev) => updateInputValue(ev)}
                  value={formData.password}
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
                  onChange={(ev) => updateInputValue(ev)}
                  value={formData.password_confirmation}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <div className="d-flex justify-content-center mt-5">
              <button type="submit" className="style-btn">
                Register
              </button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;

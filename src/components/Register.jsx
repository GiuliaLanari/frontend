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

  // const [errors, setErrors] = useState(null);

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
      });
    //  .catch((err) => {
    //       console.log(err.response.data.errors);
    //       setErrors(err.response.data.errors);
    //   });
  };

  return (
    <Container>
      <Row>
        <Col xs={12} md={5} className="mx-auto my-5">
          <h1>Register</h1>
          {/* <form onSubmit={(ev) => submitLogin(ev)} noValidate>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                onChange={(ev) => updateInputValue(ev)}
                value={formData.name}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="surname" className="form-label">
                Surname
              </label>
              <input
                type="text"
                className="form-control"
                id="surname"
                name="surname"
                onChange={(ev) => updateInputValue(ev)}
                value={formData.surname}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                onChange={(ev) => updateInputValue(ev)}
                value={formData.email}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                onChange={(ev) => updateInputValue(ev)}
                value={formData.password}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password_confirmation" className="form-label">
                Conferma password
              </label>
              <input
                type="password"
                className="form-control"
                id="password_confirmation"
                name="password_confirmation"
                onChange={(ev) => updateInputValue(ev)}
                value={formData.password_confirmation}
              />
            </div>

            <div className="d-flex justify-content-center mt-5">
              <button type="submit" className="btn style-btn">
                Register
              </button>
            </div>
          </form> */}
          <Form noValidate onSubmit={(ev) => submitLogin(ev)}>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="name">
                <Form.Label> Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Name"
                  // id="name"
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
                  // id="surname"
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
                  // id="email"
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
                  // id="password"
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
                  // id="password_confirmation"
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

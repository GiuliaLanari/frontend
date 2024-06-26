import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { LOGIN } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);

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
      .then(() => axios.post("/login", formData))
      .then((res) => {
        return axios.get("/api/user");
      })
      .then((res) => {
        setAlert(false);
        setLoading(false);

        dispatch({
          type: LOGIN,
          payload: res.data,
        });
        navigate("/");
      })

      .catch((error) => {
        setAlert(true);
        setLoading(false);
      });
  };

  return (
    <Container className="bg-login">
      <Row>
        {alert === true && (
          <Alert variant="danger" onClose={() => setAlert(false)} dismissible className="mt-5">
            <Alert.Heading>Credential errors</Alert.Heading>
          </Alert>
        )}

        {loading ? (
          <Spinner animation="grow" variant="light" className="mx-auto mt-5 mx-auto" />
        ) : (
          <Col xs={11} md={5} className="mx-auto my-5 form-container">
            <h1>Login</h1>

            <Form noValidate onSubmit={(ev) => submitLogin(ev)}>
              <Row className="mb-3">
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
              </Row>
              <div className="d-flex justify-content-center my-4">
                <button type="submit" className="style-btn">
                  Login
                </button>
              </div>
              <Link to="/forgot-password" className="dettails-password">
                Forgot Your Password?
              </Link>
            </Form>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Login;

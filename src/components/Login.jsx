import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { LOGIN } from "../redux/actions";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const Login = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(false);

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
      .then(() => axios.post("/login", formData))
      .then((res) => {
        if (res.ok) {
          return axios.get("/api/user"), setAlert(false), setLoading(false);
        } else {
          throw new Error("Login failed");
        }
      })
      .then((res) => {
        setAlert(false);
        setLoading(false);

        dispatch({
          type: LOGIN,
          payload: res.data,
        });
      })
      // .catch((error) => {
      //   // window.alert("errore nei dati");
      //   // console.log("ERRORE", error);
      //   setAlert(true);
      // });
      .catch((error) => {
        setAlert(true);
        setLoading(false);
      });
  };

  return (
    <Container>
      <Row>
        {loading ? (
          <Spinner animation="grow" className="mx-auto mt-5" />
        ) : alert ? (
          <Alert variant="danger" onClose={() => setAlert(false)} dismissible className="mt-5">
            <Alert.Heading>Credential errors</Alert.Heading>
          </Alert>
        ) : (
          <Col xs={12} md={5} className="mx-auto my-5">
            <h1>Login</h1>
            {/* <form onSubmit={(ev) => submitLogin(ev)} noValidate>
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
            <div className="d-flex justify-content-center mt-5">
              <button type="submit" className=" btn style-btn ">
                Login
              </button>
            </div>
          </form> */}
            <Form noValidate onSubmit={(ev) => submitLogin(ev)}>
              <Row className="mb-3">
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
              </Row>
              <div className="d-flex justify-content-center mt-5">
                <button type="submit" className="style-btn">
                  Login
                </button>
              </div>
            </Form>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Login;

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function VerifyEmailPage() {
  const { id, hash } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`/api/v1/verify-email/${id}/${hash}`);
        console.log(response.data);
        setMessage("Email verified successfully!");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } catch (error) {
        console.error("Verification failed:", error.response || error.message);
        setMessage("Verification failed. Please try again.");
      }
    };

    verifyEmail();
  }, [id, hash, navigate]);

  return (
    <Container fluid>
      <Row>
        <Col xs={11} md={9} className="mx-auto bg-validated">
          <h1>{message}</h1>
        </Col>
      </Row>
    </Container>
  );
}

export default VerifyEmailPage;

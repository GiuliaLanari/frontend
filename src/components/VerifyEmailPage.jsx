import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

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
          navigate(response.data.redirect_url);
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
        {/* <Col xs={11} md={9} className="mx-auto bg-validated">
          <h1>Email Verificated! </h1>
          <h3>
            go back to{" "}
            <Link to="/" className="text-home">
              HomePage
            </Link>
          </h3>
        </Col> */}
        <div className="mx-auto bg-validated text-center">
          <h1>{message}</h1>
        </div>
      </Row>
    </Container>
  );
}

export default VerifyEmailPage;

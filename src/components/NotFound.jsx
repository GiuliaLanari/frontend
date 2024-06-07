import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const NotFound = () => {
  return (
    <Container fluid>
      <Row>
        <Col xs={12} md={9} className="mx-auto  text-center error-page">
          <h1 className=" text-error">Error page</h1>
          <h3>
            go back to{" "}
            <Link to="/" className="text-error2">
              HomePage
            </Link>
          </h3>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;

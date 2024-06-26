import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const EditProfile = () => {
  return (
    <Container className="bg-editProfile">
      <Row>
        <Col xs={11} md={5} className="mx-auto my-5 form-editProfile">
          <h2 className="text-center  my-3">Profile settings</h2>
          <Link to="/update-profile" className="dettails-link">
            <img
              width="35"
              height="35"
              src="https://img.icons8.com/nolan/35/1A6DFF/C822FF/edit--v1.png"
              alt="edit--v1"
              className="me-2"
            />
            Edit profile
          </Link>
          <Link to="/update-email" className="dettails-link ">
            <img
              width="35"
              height="35"
              src="https://img.icons8.com/nolan/35/1A6DFF/C822FF/approve-and-update.png"
              alt="approve-and-update"
              className="me-2"
            />
            Edit Email
          </Link>
          <Link to="/change-password" className="dettails-link">
            <img
              width="35"
              height="35"
              src="https://img.icons8.com/nolan/35/1A6DFF/C822FF/password.png"
              alt="password"
              className="me-2"
            />
            Edit Password
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProfile;

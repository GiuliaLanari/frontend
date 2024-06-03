import axios from "axios";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const NewProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    rating: "",
    comment: "",
    // product_id: "",
    // user_id: "",
  });

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
      .then(() => axios.post(`/api/v1/reviews/${id}/add`, formData))
      .then((res) => {
        navigate("/reviews");
      });
  };

  return (
    <Container>
      <Row>
        <Col xs={12} md={5} className="mx-auto my-5">
          <h1>New review</h1>
          <form onSubmit={(ev) => submitLogin(ev)} noValidate>
            <div className="mb-3">
              <label htmlFor="rating" className="form-label">
                Rating
              </label>
              <input
                type="rating"
                className="form-control"
                id="rating"
                name="rating"
                onChange={(ev) => updateInputValue(ev)}
                value={formData.rating}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="comment" className="form-label">
                Comment
              </label>
              <input
                type="comment"
                className="form-control"
                id="comment"
                name="comment"
                onChange={(ev) => updateInputValue(ev)}
                value={formData.comment}
              />
            </div>
            <div className="d-flex justify-content-center mt-5">
              <button type="submit" className="btn style-btn">
                Add new Review
              </button>
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default NewProductForm;

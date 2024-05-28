import axios from "axios";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const NewProductForm = () => {
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
      .then(() => axios.post("/api/v1/reviews/add", formData))
      .then((res) => {
        setFormData({
          rating: "",
          comment: "",
          // product_id: "",
          // user_id: "",
        });
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
            {/* <div className="mb-3">
              <label htmlFor="product_id" className="form-label">
                product_id
              </label>
              <input
                type="product_id"
                className="form-control"
                id="product_id"
                name="product_id"
                onChange={(ev) => updateInputValue(ev)}
                value={formData.product_id}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="user_id" className="form-label">
                user_id
              </label>
              <input
                type="user_id"
                className="form-control"
                id="user_id"
                name="user_id"
                onChange={(ev) => updateInputValue(ev)}
                value={formData.user_id}
              />
            </div> */}

            <button type="submit" className="btn btn-primary">
              Add new Review
            </button>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default NewProductForm;

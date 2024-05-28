import axios from "axios";
import { useEffect, useState } from "react";

import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const NewProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/v1/products/${id}`)

      .then((res) =>
        setFormData({
          title: res.data.data.title,
          picture: res.data.data.picture === null ? "" : res.data.data.picture,
          description: res.data.data.description,
          price: res.data.data.price,
        })
      );

    // .catch((err) => navigate("/"));
  }, [id]);

  const [formData, setFormData] = useState({
    title: "",
    picture: "",
    description: "",
    price: "",
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
      .then(() => axios.put(`/api/v1/products/${id}/edit`, formData))
      .then((res) => {
        navigate("/");
      });
  };

  return (
    <Container>
      <Row>
        <Col xs={12} md={5} className="mx-auto my-5">
          <h1>New product</h1>
          <form onSubmit={(ev) => submitLogin(ev)} noValidate>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Name Product
              </label>
              <input
                type="title"
                className="form-control"
                id="title"
                name="title"
                onChange={(ev) => updateInputValue(ev)}
                value={formData.title}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="picture" className="form-label">
                Picture
              </label>
              <input
                type="picture"
                className="form-control"
                id="picture"
                name="picture"
                onChange={(ev) => updateInputValue(ev)}
                value={formData.picture}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="description"
                className="form-control"
                id="description"
                name="description"
                onChange={(ev) => updateInputValue(ev)}
                value={formData.description}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="price"
                className="form-control"
                id="price"
                name="price"
                onChange={(ev) => updateInputValue(ev)}
                value={formData.price}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Add new Product
            </button>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default NewProductForm;

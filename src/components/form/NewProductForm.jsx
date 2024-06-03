import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const NewProductForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    picture: "",
    description: "",
    price: "",
    category_id: "",
  });

  const [categories, setCategories] = useState([]);
  const [img, setImg] = useState(null);

  useEffect(() => {
    fetch("/api/v1/category")
      .then((res) => res.json())
      .then((data) => setCategories(data.data));
  }, []);

  const updateImageField = (ev) => {
    updateInputValue(ev);
    setImg(ev.target.files[0]);
  };

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
      .then(() => {
        const body = new FormData();
        body.append("title", formData.title);
        body.append("description", formData.description);
        body.append("price", formData.price);
        body.append("category_id", formData.category_id);
        body.append("picture", img);

        axios.post("/api/v1/products/add", body);
      })
      .then((res) => {
        setFormData({
          title: "",
          picture: "",
          description: "",
          price: "",
          category_id: "",
        });
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
                type="text"
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
                type="file"
                className="form-control"
                id="picture"
                name="picture"
                onChange={(ev) => updateImageField(ev)}
                value={formData.picture}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
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
                type="number"
                className="form-control"
                id="price"
                name="price"
                onChange={(ev) => updateInputValue(ev)}
                value={formData.price}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Category
              </label>

              <Form.Select
                id="category_id"
                name="category_id"
                onChange={(ev) => updateInputValue(ev)}
                value={formData.category_id}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
            </div>

            <div className="d-flex justify-content-center mt-5">
              <button type="submit" className=" btn style-btn">
                Add new Product
              </button>
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default NewProductForm;

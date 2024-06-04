import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const NewProductForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    picture: "",
    description: "",
    price: "",
    category_id: "",
  });

  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [img, setImg] = useState(null);

  useEffect(() => {
    fetch("/api/v1/category")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Trouble uploading");
        }
      })
      .then((data) => setCategories(data.data))
      .catch((error) => {
        console.log("ERRORE", error);
      });
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

  const submitForm = (ev) => {
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
        window.alert("The product has been inserted correctly!");
        navigate("/");
      })
      .catch((error) => {
        console.log("ERRORE", error);
      });
  };

  return (
    <Container>
      <Row>
        <Col xs={12} md={5} className="mx-auto my-5">
          <h1>New product</h1>
          {/* <form onSubmit={(ev) => submitLogin(ev)} noValidate>
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
          </form> */}
          <Form noValidate onSubmit={(ev) => submitForm(ev)}>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="title">
                <Form.Label>Name Product</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Name Product"
                  // id="title"
                  name="title"
                  onChange={(ev) => updateInputValue(ev)}
                  value={formData.title}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="12" controlId="picture">
                <Form.Label>Picture</Form.Label>
                <Form.Control
                  required
                  type="file"
                  placeholder="Last name"
                  // id="picture"
                  name="picture"
                  onChange={(ev) => updateImageField(ev)}
                  // value={formData.picture}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="12" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Description"
                  // id="description"
                  name="description"
                  onChange={(ev) => updateInputValue(ev)}
                  value={formData.description}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="12" controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="price"
                  // id="price"
                  name="price"
                  onChange={(ev) => updateInputValue(ev)}
                  value={formData.price}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="12" controlId="category">
                <Form.Label>Category</Form.Label>

                <Form.Select
                  // id="category_id"
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
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <div className="d-flex justify-content-center mt-5">
              <Button type="submit" className="style-btn">
                Add new Product
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default NewProductForm;

import axios from "axios";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/v1/category")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Trouble uploading");
        }
      })
      .then((data) => {
        setCategories(data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
        setAlert(false);
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
        setError(false);
        setLoading(false);
        setAlert(true);
        setFormData({
          title: "",
          picture: "",
          description: "",
          price: "",
          category_id: "",
        });
      })
      .catch((error) => {
        setError(true);
        setAlert(false);
        setLoading(false);
      });
  };

  return (
    <Container>
      <Row>
        {error === true && (
          <Alert variant="danger" onClose={() => setAlert(false)} dismissible className="mt-5">
            <Alert.Heading>New product not added. Try again!</Alert.Heading>
          </Alert>
        )}

        {alert === true && (
          <Alert variant="success" onClose={() => setAlert(false)} dismissible className="mt-5">
            <Alert.Heading>The new product has been successfully added!</Alert.Heading>
          </Alert>
        )}

        {loading ? (
          <Spinner animation="grow" className="mx-auto mt-5" />
        ) : (
          <Col xs={12} md={5} className="mx-auto my-5">
            <h1>New product</h1>
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
                    name="picture"
                    onChange={(ev) => updateImageField(ev)}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="12" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Description"
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
                    name="price"
                    onChange={(ev) => updateInputValue(ev)}
                    value={formData.price}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="12" controlId="category">
                  <Form.Label>Category</Form.Label>

                  <Form.Select name="category_id" onChange={(ev) => updateInputValue(ev)} value={formData.category_id}>
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
                <button type="submit" className="style-btn">
                  Add new Product
                </button>
              </div>
            </Form>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default NewProductForm;

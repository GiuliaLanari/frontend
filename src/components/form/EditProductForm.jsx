import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

const EditProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [img, setImg] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    picture: "",
    description: "",
    price: "",
    category_id: "",
  });

  useEffect(() => {
    axios
      .get(`/api/v1/products/${id}`)

      .then((res) => {
        setLoading(false);
        setError(false);
        setFormData({
          title: res.data.data.title,
          description: res.data.data.description,
          price: res.data.data.price,
          category_id: res.data.data.category_id,
        });
      })

      .catch((err) => {
        setError(true);
        setLoading(false);
        setAlert(false);
      });
  }, [id]);

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
        if (img) {
          body.append("picture", img);
        }

        return axios.post(`/api/v1/products/${id}/edit`, body);
      })

      .then((res) => {
        navigate("/");
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
            <Alert.Heading>The product has not been modified. Try again!</Alert.Heading>
          </Alert>
        )}

        {alert === true && (
          <Alert variant="success" onClose={() => setAlert(false)} dismissible className="mt-5">
            <Alert.Heading>The product has been successfully modified!</Alert.Heading>
          </Alert>
        )}

        {loading ? (
          <Spinner animation="grow" className="mx-auto mt-5" />
        ) : (
          <Col xs={12} md={5} className="mx-auto my-5">
            <h1 className="text-center my-2">Edit product</h1>
            <form onSubmit={(ev) => submitForm(ev)} noValidate>
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
                  // value={formData.picture}
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
                <button type="submit" className="btn style-btn">
                  Edit Product
                </button>
              </div>
            </form>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default EditProductForm;

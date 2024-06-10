import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Product = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    // fetch(`/api/v1/products/${id}`)
    //   .then((res) => {
    //     if (!res.ok) navigate("/404");
    //     return res.json();
    //   })
    //   .then((data) => setProduct(data.data))
    //   .catch((error) => {
    //     console.error("Error loading:", error);
    //     navigate("/404");
    //   });
    fetch(`/api/v1/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        return res.json();
      })
      .then((data) => {
        setLoading(false);
        setProduct(data.data);
      })
      .catch((error) => {
        setLoading(false);
        navigate("/404");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  console.log(product);

  return (
    product && (
      <Container>
        {loading ? (
          <Spinner animation="grow" className="mx-auto mt-5" />
        ) : (
          <Row>
            <Col xs={12} className="my-5">
              <Row>
                <Col xs={12} md={5} className="zoom-wrapper">
                  <img
                    src={process.env.REACT_APP_BACKEND_URL + "/" + product.picture}
                    alt={product.title}
                    className="w-100"
                  />
                </Col>
                <Col xs={12} md={7}>
                  <h1>{product.title}</h1>
                  <p>
                    {" "}
                    <span className="fw-bold">Description: </span> {product.description}
                  </p>
                  <p>
                    <span className="fw-bold">Published date: </span>
                    {new Date(product.created_at).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="fw-bold">Size:</span> XL
                  </p>
                  <p>
                    <span className="fw-bold">Category:</span> {product.category.name}
                  </p>
                  <p>
                    <span className="fw-bold">Price:</span> £ {product.price}
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
        )}
      </Container>
    )
  );
};

export default Product;

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Product = () => {
  const [product, setProduct] = useState(null); // null buon candidato
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/v1/products/${id}`)
      .then((res) => {
        if (!res.ok) navigate("/404");
        return res.json();
      })
      .then((data) => setProduct(data.data));
  }, [id]);
  console.log(product);

  return (
    product && (
      <Container>
        <Row>
          <Col xs={12} className="my-5">
            <Row>
              <Col xs={12} md={5}>
                <img src={product.picture} alt={product.title} />
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
      </Container>
    )
  );
};

export default Product;

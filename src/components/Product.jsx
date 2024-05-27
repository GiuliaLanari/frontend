import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { useNavigate, useParams } from "react-router-dom";

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

  return (
    product && (
      <Container>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <p>£ {product.price}</p>
      </Container>
    )
  );
};

export default Product;

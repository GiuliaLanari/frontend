import { useState } from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/v1/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <Container>
      <h1>Home page con prodotti</h1>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.title}</h2>
          <Link to={`/products/${product.id}`}>Dettagli</Link>
        </div>
      ))}
    </Container>
  );
};

export default Home;

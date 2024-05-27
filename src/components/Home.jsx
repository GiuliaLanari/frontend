import { useState } from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

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
          {/* in caso del cliente */}
          <Button variant="primary mx-1">Add to cart</Button>
          {/* questi nel caso è un amministratore */}
          <Button variant="danger mx-1">Delete</Button>
          <Button variant="success mx-1">Edit</Button>
          {/*  */}
        </div>
      ))}
    </Container>
  );
};

export default Home;

import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/v1/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const deleteProduct = (id) => {
    axios
      .delete(`/api/v1/products/${id}`)

      .then((res) => {
        navigate("/");
      });
  };

  return (
    <Container>
      <h1>Home page con prodotti</h1>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.title}</h2>
          <Link to={`/products/${product.id}`}>Dettagli</Link>
          {/* in caso del cliente ⬇ */}
          {user && user.role === "client" ? <Button variant="primary mx-1">Add to cart</Button> : ""}

          {/* questi nel caso è un amministratore ⬇*/}
          {user && user.role === "admin" ? (
            <>
              <Button
                onClick={() => {
                  deleteProduct(product.id);
                }}
                variant="danger mx-1"
              >
                Delete
              </Button>
              <Link to={`/products/${product.id}/edit`} className="btn btn-info">
                Edit
              </Link>
            </>
          ) : (
            ""
          )}
        </div>
      ))}
    </Container>
  );
};

export default Home;

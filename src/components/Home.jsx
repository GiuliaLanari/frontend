import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const user = useSelector((state) => state.user);

  // const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/v1/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.data));
  }, []);

  const deleteProduct = (id) => {
    axios
      .delete(`/api/v1/products/${id}`)

      .then((res) => {
        window.location.reload("/");
      });
  };

  const addCart = (id) => {
    axios.post(`/api/v1/carts/${id}/add`).then((res) => setCart(res));
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={12} className="bg-black">
          <h1 className=" text ">...PlusArt...</h1>
        </Col>
      </Row>

      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.title}</h2>
          <img src={product.picture} alt={product.title} className="w-25" />
          <Link to={`/products/${product.id}`}>Dettagli</Link>

          {/* in caso del cliente ⬇ */}

          {user && user.role === "client" ? (
            <Button
              onClick={() => {
                addCart(product.id);
              }}
              variant="primary mx-2"
            >
              Add to cart
            </Button>
          ) : (
            ""
          )}

          {user && user.role === "client" ? (
            <Link className="nav-link" to={`/reviews/${product.id}/add`}>
              Add review
            </Link>
          ) : (
            ""
          )}

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

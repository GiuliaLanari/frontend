import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
      })
      .catch((error) => {
        console.log("ERRORE", error);
      });
  };

  const addCart = (id) => {
    axios.post(`/api/v1/carts/${id}/add`).then((res) => setCart(res));
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={12} className="bg-black">
          <h1 className=" text ">PlusArt</h1>
        </Col>
        <Col xs={12}>
          <Row className="my-5">
            {products.map((product) => (
              <Col xs={12} md={4} className="text-center my-5" key={product.id}>
                <div>
                  <h2>{product.title}</h2>
                  <img src={product.picture} alt={product.title} className="w-50" />
                </div>
                <div className="d-flex flex-column align-items-center">
                  <Link to={`/products/${product.id}`} className="dettails-link">
                    Details
                  </Link>

                  {user && user.role === "client" ? (
                    <button
                      onClick={() => {
                        addCart(product.id);
                      }}
                      className="style-btn my-3"
                    >
                      Add to cart
                    </button>
                  ) : (
                    ""
                  )}

                  {user && user.role === "client" ? (
                    <Link className="dettails-link" to={`/reviews/${product.id}/add`}>
                      Add review
                    </Link>
                  ) : (
                    ""
                  )}

                  {/* questi nel caso è un amministratore ⬇*/}
                  {user && user.role === "admin" ? (
                    <div>
                      <button
                        onClick={() => {
                          deleteProduct(product.id);
                        }}
                        className="mx-1 my-3 style-btn-delete"
                      >
                        <FaTrash />
                      </button>
                      <Link to={`/products/${product.id}/edit`} className="style-btn">
                        <FaPen className="text-white" />
                      </Link>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;

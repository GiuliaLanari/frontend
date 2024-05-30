import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { useNavigate, useParams } from "react-router-dom";

const OrderDettail = () => {
  const [order, setOrder] = useState(null); // null buon candidato
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/v1/orders/${id}`)
      .then((res) => {
        if (!res.ok) navigate("/404");
        return res.json();
      })
      .then((data) => setOrder(data.data));
  }, [id]);

  return (
    order && (
      <Container>
        <h1>Numero ordine:{order.id}</h1>
        <p>Date invio: {order.created_at}</p>
        <p>
          User:{order.user.name} {order.user.surname}
        </p>
        <p>Email: {order.user.email}</p>

        {order.products.map((product) => (
          <div key={product.id}>
            <p>Nome prodotto: {product.title}</p>
            <p>Quantità: {product.pivot.quantity}</p>
          </div>
        ))}
        <p>
          Totale: £ {order.products.reduce((total, product) => total + product.pivot.price * product.pivot.quantity, 0)}
        </p>
      </Container>
    )
  );
};

export default OrderDettail;

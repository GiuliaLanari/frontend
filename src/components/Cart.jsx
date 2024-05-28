import { useState } from "react";
import { useEffect } from "react";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("/api/v1/products")
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, []);

  return (
    <>
      <h1>pagina carello</h1>
      <p>client</p>
      <p>Funzionalità: -add -remove -buy</p>
    </>
  );
};

export default Cart;

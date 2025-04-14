import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCart, clearCart } from "../../store/actions/cartActions";
import s from "./Cart.module.css"

const Cart = () => {
  const dispatch = useDispatch();
  const { items, products } = useSelector((state) => state.cart);
  console.log('items', items);

  useEffect(() => {
    // Obtener los elementos del carrito del localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Si hay elementos en el carrito, despachar la acción para obtener el carrito
    if (cartItems.length > 0) {
      dispatch(getCart(cartItems));
    }
  }, [dispatch]);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  console.log('products', products);

  return(
    <div className={s.container}>
      <h2>Este es mi carrito</h2>
      <button onClick={handleClearCart}>Limpiar carrito</button>
    </div>
  );
};


export default Cart;
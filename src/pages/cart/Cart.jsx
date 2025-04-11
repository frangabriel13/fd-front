import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCart } from "../../store/actions/cartActions";
import s from "./Cart.module.css"

const Cart = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  console.log('items', items);

  useEffect(() => {
    // Obtener los elementos del carrito del localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    console.log('cartItems', cartItems);

    // Si hay elementos en el carrito, despachar la acción para obtener el carrito
    if (cartItems.length > 0) {
      dispatch(getCart(cartItems));
    }
  }
  , [dispatch]);

  return(
    <div className={s.container}>
      Este es mi carrito de compras
    </div>
  );
};


export default Cart;
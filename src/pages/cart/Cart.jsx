import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCart, clearCart } from "../../store/actions/cartActions";
import s from "./Cart.module.css"

const Cart = () => {
  const dispatch = useDispatch();
  const { items, products } = useSelector((state) => state.cart);

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
  
  console.log('items', items);
  console.log('products', products);

  return(
    <div className={s.container}>
      <div className={s.divHeader}>
        <h2 className={s.title}>Carrito de compras</h2>
      </div>
      <div className={s.divCart}>
        {
          items.length > 0 ? (
            items.map((item) => (
              <div key={item.manufacturerId} className={s.cartItem}>
                <h3>{item.manufacturerName}</h3>
              </div>
            ))
          ) : (
            <p>No hay productos en el carrito.</p>
          )
        }
      </div>
      <button onClick={handleClearCart}>Limpiar carrito</button>
    </div>
  );
};


export default Cart;
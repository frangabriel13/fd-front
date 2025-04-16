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
        {products.map((product) => (
          <div key={product.manufacturer.userId} className={s.cartCard}>
            <div className={s.cartInfo}>
              <div className={s.divManufacturer}>
                <img
                  src={product.manufacturer.image}
                  alt={product.manufacturer.name}
                  className={s.logo}
                />
                <h3 className={s.name}>{product.manufacturer.name}</h3>
              </div>
              <div className={s.divManufacturer}>
                <p className={s.total}>Total:</p>
                <p className={s.priceTotal}>$50.000</p>
              </div>
              <div className={s.divManufacturer}>
                <p className={s.minPurchase}>Mínimo de compra: $60.000</p>
                <p className={s.priceUSD}>Consulta con el fabricante para abonar de dólares</p>
              </div>
            </div>
            <div className={s.divActions}>
              <button className={s.btnDelete}>Eliminar</button>
              <button className={s.btnSend}>Enviar pedido</button>
              <button className={s.btnDetail}>Ver detalle</button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleClearCart}>Limpiar carrito</button>
    </div>
  );
};


export default Cart;
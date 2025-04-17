import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCart, clearCart } from "../../store/actions/cartActions";
import s from "./Cart.module.css";
import DetailCart from "./DetailCart";

const Cart = () => {
  const dispatch = useDispatch();
  const { items, products } = useSelector((state) => state.cart);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedCart, setSelectedCart] = useState(null);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    if (cartItems.length > 0) {
      dispatch(getCart(cartItems));
    }
  }, [dispatch]);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleShowDetail = (product) => {
    setSelectedCart(product);
    setShowDetail(true);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
    setSelectedCart(null);
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
              <button className={s.btnDetail} onClick={() => handleShowDetail(product)}>Ver detalle</button>
            </div>
          </div>
        ))}
      <div className={s.divBtns}>
        <button className={s.btnBuy}>Unificar pedido</button>
        <button className={s.btnClean} onClick={handleClearCart}>Vaciar carrito</button>
      </div>
      <p className={s.pUnifique}>Unifica el pedido y nostros nos ocuparemos de la gestión del mismo</p>
      </div>
      {showDetail && <DetailCart cart={selectedCart} onClose={handleCloseDetail} />}
    </div>
  );
};


export default Cart;
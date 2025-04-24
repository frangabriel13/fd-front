import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCart, clearCart, deleteCart } from "../../store/actions/cartActions";
import s from "./Cart.module.css";
import DetailCart from "./DetailCart";
import { calculateTotalCart, formatPrice } from "../../utils/utils";


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

  const handleDeleteCart = (manufacturerId) => {
    dispatch(deleteCart(manufacturerId));
    refreshCart(); // Refresca el carrito después de eliminar un manufacturer
  };

  const refreshCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    dispatch(getCart(cartItems)); // Refresca el carrito después de guardar cambios
  };
  
  console.log('items', items);
  console.log('products', products);

  const unifiedTotal = products.reduce((acc, product) => acc + calculateTotalCart(product), 0);

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
                <p className={s.priceTotal}>{formatPrice(calculateTotalCart(product))}</p>
              </div>
              <div className={s.divManufacturer}>
                <p className={s.minPurchase}>Mínimo de compra: $60.000</p>
                <p className={s.priceUSD}>Consulta con el fabricante para abonar de dólares</p>
              </div>
            </div>
            <div className={s.divActions}>
              <button className={s.btnDelete} onClick={() => handleDeleteCart(product.manufacturer.userId)}>Eliminar</button>
              <button className={s.btnSend}>Enviar pedido</button>
              <button className={s.btnDetail} onClick={() => handleShowDetail(product)}>Ver detalle</button>
            </div>
          </div>
        ))}
      <div className={s.divUnified}>
        <p className={s.textUnified}>Total unificado: <span className={s.totalUnified}>{formatPrice(unifiedTotal)}</span></p>
        <div className={s.divBtns}>
          <button className={s.btnBuy}>Unificar pedido</button>
          <button className={s.btnClean} onClick={handleClearCart}>Vaciar carrito</button>
        </div>
      </div>
      <p className={s.pUnifique}>Unifica el pedido y nostros nos ocuparemos de la gestión del mismo</p>
      </div>
      {showDetail && <DetailCart cart={selectedCart} onClose={handleCloseDetail} refreshCart={refreshCart} />}
    </div>
  );
};


export default Cart;
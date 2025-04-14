import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCart, clearCart } from "../../store/actions/cartActions";
import s from "./Cart.module.css"
import { groupedItems } from "../../utils/utils";

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

  const grouped = groupedItems(items, products);
  console.log('grouped', grouped);

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
                {item.packs.map((pack) => (
                  <div key={pack.packId} className={s.packItem}>
                    <h4>{pack.packName}</h4>
                    {pack.products.map((product) => (
                      <div key={product.productId} className={s.productItem}>
                        <p>{product.productName}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p>No hay productos en el carrito.</p>
          )
        }
      </div>
      {/* <button onClick={handleClearCart}>Limpiar carrito</button> */}
    </div>
  );
};


export default Cart;
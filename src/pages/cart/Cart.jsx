import { useSelector } from "react-redux";
import s from "./Cart.module.css"

const Cart = () => {
  const { items } = useSelector((state) => state.cart);
  console.log('items', items);

  return(
    <div className={s.container}>
      Este es mi carrito de compras
    </div>
  );
};


export default Cart;
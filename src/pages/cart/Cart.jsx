import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCart, clearCart, deleteCart } from "../../store/actions/cartActions";
import { createOrder } from "../../store/actions/orderActions";
import s from "./Cart.module.css";
import DetailCart from "./DetailCart";
import EditData from "../../components/modals/EditData";
import { calculateTotalCart, formatPrice } from "../../utils/utils";
import { FaEdit } from "react-icons/fa";
import SuccesModal from "../../components/modals/SuccessModal";

const Cart = () => {
  const dispatch = useDispatch();
  const { items, products, dataUser } = useSelector((state) => state.cart);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedCart, setSelectedCart] = useState(null);
  const [showEditData, setShowEditData] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    if (cartItems.length > 0) {
      dispatch(getCart(cartItems));
    }
  }, [dispatch]);

  const handleClearCart = () => {
    dispatch(clearCart());
    refreshCart();
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

  const handleOpenEditModal = () => {
    setShowEditData(true);
  };

  const handleCloseEditModal = () => {
    setShowEditData(false);
  };

  const refreshCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    dispatch(getCart(cartItems)); // Refresca el carrito después de guardar cambios
  };

  const handleSendOrder = (product) => {
    if (user?.role === "manufacturer") {
      setShowSuccessModal({
        show: true,
        title: "Acción no permitida",
        message: "Debe cerrar sesión como Fabricante para poder generar una orden.",
      });
      return;
    }

    if (!dataUser || Object.keys(dataUser).length === 0) {
      setShowEditData(true);
      return;
    }

    const order = {
      manufacturer: {
        userId: product.manufacturer.userId,
        name: product.manufacturer.name,
      },
      packs: product.packs.map((pack) => ({
        id: pack.id,
        name: pack.name,
        totalItem: pack.totalItem,
        price: pack.price,
      })),
      products: product.products.map((prod) => ({
        id: prod.id,
        price: prod.price,
        name: prod.name,
        inventories: prod.inventories.map((inventory) => ({
          color: inventory.color,
          size: inventory.size,
          totalItem: inventory.totalItem,
        })),
      })),
      totalCart: calculateTotalCart(product),
    };
  
    const payload = {
      userData: dataUser,
      carts: [order],
    };
  
    dispatch(createOrder(payload));
  };

  const handleUnifiedOrder = () => {
    if (user?.role === "manufacturer") {
      setShowSuccessModal({
        show: true,
        title: "Acción no permitida",
        message: "Debe cerrar sesión como Fabricante para poder generar una orden.",
      });
      return;
    }

    console.log('dataUser: ', dataUser);
    if (!dataUser || Object.keys(dataUser).length === 0) {
      setShowEditData(true);
      return;
    }

    const unifiedOrder = {
      userData: dataUser,
      carts: products.map((product) => ({
        manufacturer: {
          userId: product.manufacturer.userId,
          name: product.manufacturer.name,
        },
        packs: product.packs.map((pack) => ({
          id: pack.id,
          name: pack.name,
          price: pack.price,
          totalItem: pack.totalItem,
        })),
        products: product.products.map((prod) => ({
          id: prod.id,
          price: prod.price,
          name: prod.name,
          inventories: prod.inventories.map((inventory) => ({
            color: inventory.color,
            size: inventory.size,
            totalItem: inventory.totalItem,
          })),
        })),
        totalCart: calculateTotalCart(product),
      })),
    };
  
    dispatch(createOrder(unifiedOrder));
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal({ show: false, title: "", message: "" });
  };

  const unifiedTotal = products.reduce((acc, product) => acc + calculateTotalCart(product), 0);

  return(
    <div className={s.container}>
      <div className={s.divHeader}>
        <h2 className={s.title}>Carrito de compras</h2>
        {!isAuthenticated && (
          <div className={s.divUserData}>
            {dataUser && dataUser.name && (
              <p className={s.userName}>{dataUser.name}</p>
            )}
            <FaEdit className={s.editIcon} title="Editar datos" onClick={handleOpenEditModal} />
          </div>
        )}
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
              <button className={s.btnSend} onClick={() => handleSendOrder(product)}>Enviar pedido</button>
              <button className={s.btnDetail} onClick={() => handleShowDetail(product)}>Ver detalle</button>
            </div>
          </div>
        ))}
      <div className={s.divUnified}>
        <p className={s.textUnified}>Total unificado: <span className={s.totalUnified}>{formatPrice(unifiedTotal)}</span></p>
        <div className={s.divBtns}>
          <button className={s.btnBuy} onClick={handleUnifiedOrder}>Unificar pedido</button>
          <button className={s.btnClean} onClick={handleClearCart}>Vaciar carrito</button>
        </div>
      </div>
      <p className={s.pUnifique}>Unifica el pedido y nostros nos ocuparemos de la gestión del mismo</p>
      </div>
      {showDetail && <DetailCart cart={selectedCart} onClose={handleCloseDetail} refreshCart={refreshCart} />}
      {showEditData && <EditData dataUser={dataUser} onClose={handleCloseEditModal} />}
      {showSuccessModal.show && (
        <SuccesModal
          title={showSuccessModal.title}
          message={showSuccessModal.message}
          onClose={handleCloseSuccessModal}
        />
      )}
    </div>
  );
};


export default Cart;
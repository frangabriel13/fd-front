import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCart, clearCart, deleteCart } from "../../store/actions/cartActions";
import { createOrder } from "../../store/actions/orderActions";
import s from "./Cart.module.css";
import DetailCart from "./DetailCart";
import EditData from "../../components/modals/EditData";
import { calculateTotalCart, formatPrice, contactWspOrder } from "../../utils/utils";
import { FaEdit } from "react-icons/fa";
import SuccesModal from "../../components/modals/SuccessModal";

const Cart = () => {
  const dispatch = useDispatch();
  const { items, products = [], dataUser } = useSelector((state) => state.cart);
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

  if(typeof products === "undefined") {
    return <div className={s.loading}>Cargando carrito...</div>;
  }

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

  const handleSendOrder = async (product) => {
    if (products.length === 0) {
      setShowSuccessModal({
        show: true,
        title: "Carrito vacío",
        message: "Debes añadir algo al carrito para poder realizar esta acción.",
      });
      return;
    }
    
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

    const totalCart = calculateTotalCart(product);
    if (totalCart < product.manufacturer.minPurchase) { // Validación dinámica del mínimo de compra
      setShowSuccessModal({
        show: true,
        title: "Atención",
        message: `El mínimo de compra en ${product.manufacturer.name} es de ${formatPrice(product.manufacturer.minPurchase)}.`,
      });
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
  
    try {
      const createdOrder = await dispatch(createOrder(payload)); // Llama a la acción y espera la respuesta
      const orderId = createdOrder?.id; // Extrae el ID de la orden creada
      handleDeleteCart(product.manufacturer.userId);
      setShowSuccessModal({
        show: true,
        title: `Orden #${orderId} generada con éxito`,
        message: "Puedes ver el detalle de la orden en tu cuenta, en la sección de mis compras.",
        showContactButton: true,
        orderId,
        manufacturerName: product.manufacturer.name,
        manufacturerPhone: product.manufacturer.phone,
      });
    } catch (error) {
      console.error("Error al crear la orden:", error);
      setShowSuccessModal({
        show: true,
        title: "Error",
        message: "Hubo un problema al generar la orden. Por favor, inténtalo nuevamente.",
      });
    }
  };

  const handleUnifiedOrder = () => {
    if (products.length === 0) {
      setShowSuccessModal({
        show: true,
        title: "Carrito vacío",
        message: "Debes añadir algo al carrito para poder realizar esta acción.",
      });
      return;
    }

    if (!isAuthenticated) {
      setShowSuccessModal({
        show: true,
        title: "Acción no permitida",
        message: "Debe registrarse como mayorista para poder unificar pedidos.",
      });
      return;
    }

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

    for (const product of products) {
      const totalCart = calculateTotalCart(product);
      if (totalCart < product.manufacturer.minPurchase) {
        setShowSuccessModal({
          show: true,
          title: "Atención",
          message: `El mínimo de compra en ${product.manufacturer.name} (${formatPrice(product.manufacturer.minPurchase)}).`,
        });
        return;
      }
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
    handleClearCart();
    setShowSuccessModal({
      show: true,
      title: "Orden generada con éxito",
      message: "Puedes ver el detalle de la orden en tu cuenta, en la sección de mis compras.",
    });
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal({ show: false, title: "", message: "" });
  };

  // const unifiedTotal = products.reduce((acc, product) => acc + calculateTotalCart(product), 0);
  const safeProducts = Array.isArray(products) ? products : [];
  const unifiedTotal = safeProducts.reduce((acc, product) => acc + calculateTotalCart(product), 0);

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
                <p className={s.minPurchase}>Mínimo de compra: {formatPrice(product.manufacturer.minPurchase)}</p>
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
      <p className={s.pUnifique}>Unifica el pedido para que todas tus compras se agrupen en un único envío</p>
      </div>
      {showDetail && <DetailCart cart={selectedCart} onClose={handleCloseDetail} refreshCart={refreshCart} />}
      {showEditData && <EditData dataUser={dataUser} onClose={handleCloseEditModal} />}
      {showSuccessModal.show && (
        <SuccesModal
          title={showSuccessModal.title}
          message={showSuccessModal.message}
          onClose={handleCloseSuccessModal}
          showContactButton={showSuccessModal.showContactButton}
          orderId={showSuccessModal.orderId}
          onContact={() => contactWspOrder(showSuccessModal.manufacturerName, showSuccessModal.manufacturerPhone, showSuccessModal.orderId)}
        />
      )}
    </div>
  );
};


export default Cart;
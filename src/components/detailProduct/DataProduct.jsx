import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, deleteFavorite } from '../../store/actions/favoriteActions';
import s from './DataProduct.module.css';
import { 
  BsHeart, 
  BsFillHeartFill,
  BsStar,
  BsStarHalf,
  BsStarFill,
} from "react-icons/bs";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { formatPrice, contactWspProduct, shareWspLink } from '../../utils/utils';
import SuccessModal from '../modals/SuccessModal';
import Description from './Description';

const DataProduct = ({ product, manufacturer, onAddToCart }) => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.favorite);
  const { user } = useSelector((state) => state.auth);
  const [isFavorite, setIsFavorite] = useState(
    favorites.some((fav) => fav.productId === product.id) // Verificar si el producto está en favoritos
  );
  const [quantities, setQuantities] = useState(
    product.inventories.map((inv) => ({ id: inv.id, quantity: inv.quantity || 0 }))
  );
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '' });

  const handleFavoriteClick = async () => {
    if (!user || user.role !== "wholesaler") {
      setModalContent({
        title: "Acción no permitida",
        text: "Debes ser mayorista para agregar productos a favoritos.",
      });
      setShowModal(true);
      return;
    }
  
    if (isFavorite) {
      const result = await dispatch(deleteFavorite(product.id));
      if (result.success) {
        setIsFavorite(false);
      }
    } else {
      const result = await dispatch(addFavorite(product.id));
      if (result.success) {
        setIsFavorite(true);
      }
    }
  };

  const handleDecrement = (id) => {
    setQuantities((prevQuantities) => 
      prevQuantities.map((inv) => 
        inv.id === id ? { ...inv, quantity: Math.max(0, inv.quantity - 1) } : inv
      )
    );
  };
  
  const handleIncrement = (id) => {
    setQuantities((prevQuantities) => 
      prevQuantities.map((inv) => 
        inv.id === id ? { ...inv, quantity: inv.quantity + 1 } : inv
      )
    );
  }

  const handleChange = (id, value) => {
    const newValue = Math.max(0, parseInt(value) || 0);
    setQuantities((prevQuantities) => 
      prevQuantities.map((inv) => 
        inv.id === id ? { ...inv, quantity: newValue } : inv
      )
    );
  }

  const handleAddToCartClick = () => {
    const variations = quantities
      .filter((q) => q.quantity > 0)
      .map((q) => ({
        variationId: q.id,
        quantity: q.quantity,
      }));

    if (variations.length > 0) {
      onAddToCart(variations);
      setQuantities(
        product.inventories.map((inv) => ({ id: inv.id, quantity: 0 }))
      );
      setModalContent({
        title: 'Producto añadido',
        text: 'Los productos seleccionados se han añadido al carrito correctamente.',
      });
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  
  return (
    <div className={s.container}>
      <div className={s.divHeader}>
        <div className={s.divCategory}>
          <p>{product.category.name} | {product.category.parent.name}</p>
        </div>
        <div className={s.divName}>
          <div className={s.divTitle}>
            <h2 className={s.title}>{product.name}</h2>
            <div className={s.divShare}>
              <FaRegShareFromSquare className={s.iconShare} onClick={() => shareWspLink(window.location.href)} />
              {isFavorite ? (
                <BsFillHeartFill 
                  className={`${s.iconHeart} ${s.active}`} 
                  onClick={handleFavoriteClick} 
                />
              ) : (
                <BsHeart 
                  className={s.iconHeart} 
                  onClick={handleFavoriteClick} 
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={s.divPrice}>
        <div className={s.wholePrice}>
          <p className={s.price}>{formatPrice(product.price)}</p>
          <p className={s.whole}>Comprando al por mayor</p>
        </div>
        {product.priceUSD && (
          <div className={s.wholePrice}>
            <p className={s.price}>U$D {product.priceUSD}</p>
            <p className={s.whole}>Comprando en dólares</p>
          </div>
        )}
      </div>
      <div className={s.divContact}>
        <h5>Contacta con {manufacturer.name}:</h5>
        <div className={s.manuData}>
          <button
            onClick={() => {
              contactWspProduct(
                manufacturer.name,
                manufacturer.phone,
                window.location.href,
              );
            }}
          >Contactar</button>
          {/* <p>{manufacturer.street}</p> */}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(manufacturer.street)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={s.streetLink}
          >
            {manufacturer.street}
          </a>
        </div>
      </div>
      <div className={s.divDescription}>
        <h3>Descripción:</h3>
        <Description text={product.description} />
      </div>
      <div className={s.divQuantities}>
        { product.isVariable ? (
          <p>Selecciona los  colores:</p>
        ) : (
          <p>Selecciona los talles:</p>
        )}
        {
          product.inventories.map((inv) => {
            return (
              <div key={inv.id} className={s.divInventory}>
                {product.isVariable ? (
                  <div className={s.divColor}>
                    <div
                      className={s.color}
                      style={{
                        backgroundColor: inv.code,
                      }}>
                    </div>
                    <p>{inv.color}</p>
                  </div>
                ) : (
                  <p>{inv.size}</p>
                )}
                <div className={s.divQuant}>
                  <button 
                    className={s.buttonQuant}
                    onClick={() => handleDecrement(inv.id)}
                  >-</button>
                  <input 
                    type="number" 
                    className={s.inputQuant}
                    value={quantities.find((q) => q.id === inv.id).quantity}
                    onChange={(e) => handleChange(inv.id, e.target.value)}
                  />
                  <button 
                    className={s.buttonQuant}
                    onClick={() => handleIncrement(inv.id)}
                  >+</button>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className={s.divCart}>
        <button className={s.btnCart} onClick={handleAddToCartClick}>Añadir al carrito</button>
      </div>
      {showModal && (
        <SuccessModal 
          title={modalContent.title} 
          message={modalContent.text} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};


export default DataProduct;
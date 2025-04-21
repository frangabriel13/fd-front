import s from './DetailCart.module.css';
import { formatPrice } from '../../utils/utils';

const DetailCart = ({ cart, onClose }) => {
  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  console.log('cart', cart);

  return (
    <div className={s.modal} onClick={handleClickOutside}>
      <div className={s.modalContent}>
        <div className={s.container}>
          <div className={s.divTitle}>
            <h3>Detalles del carrito</h3>
          </div>
          <div className={s.divProducts}>
            <h4>Productos</h4>
            {cart.products.map((product) => (
              <div key={product.id} className={s.productCard}>
                <div className={s.productInfo}>
                  <img src={product.mainImage} alt={product.name} className={s.productImage} />
                  <div className={s.divName}>
                    <h5 className={s.productName}>{product.name}</h5>
                    <p className={s.productPrice}>{formatPrice(product.price)}</p>
                  </div>
                </div>
                <div className={s.divQuantities}>
                  {product.inventories.some((inventory) => inventory.size !== 'Único') && (
                    <div className={s.divList}>
                      <h6>Talles</h6>
                      {product.inventories
                        .map((inventory, index) => (
                          <div key={index}>
                            <p className={s.inventoryDetail}>{inventory.size}</p>
                            <div className={s.divActions}></div>
                          </div>
                        ))}
                    </div>
                  )}
                  {product.inventories.some((inventory) => inventory.size === 'Único') && (
                    <div className={s.divList}>
                      <h5>Colores</h5>
                      {product.inventories
                        .map((inventory, index) => (
                          <p key={index} className={s.inventoryDetail}>{inventory.color}</p>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
};


export default DetailCart;
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
                          <div key={index} className={s.divInventory}>
                            <p className={s.inventoryDetail}>{inventory.size}</p>
                            <div className={s.divQuant}>
                              <button 
                                className={s.buttonQuant}
                              >-</button>
                              <input 
                                type="number" 
                                className={s.inputQuant}
                              />
                              <button 
                                className={s.buttonQuant}
                              >+</button>
                              <button className={s.buttonDelete}>x</button>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                  {product.inventories.some((inventory) => inventory.size === 'Único') && (
                    <div className={s.divList}>
                      <h6>Colores</h6>
                      {product.inventories
                        .map((inventory, index) => (
                          <div key={index} className={s.divInventory}>
                            <p className={s.inventoryDetail}>{inventory.color}</p>
                            <div className={s.divQuant}>
                              <button 
                                className={s.buttonQuant}
                              >-</button>
                              <input 
                                type="number" 
                                className={s.inputQuant}
                              />
                              <button 
                                className={s.buttonQuant}
                              >+</button>
                              <button className={s.buttonDelete}>x</button>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className={s.divProducts}>
            <h4>Packs</h4>
            {cart.packs.map((pack) => (
              <div key={pack.id} className={s.productCard}>
                <div className={s.packInfo}>
                  <div className={s.divName}>
                    <h5 className={s.productName}>{pack.name}</h5>
                    <p className={s.productPrice}>{formatPrice(pack.price)}</p>
                  </div>
                  <div className={s.divBtn}>
                    <button>Ver pack</button>
                  </div>
                </div>
                <div className={s.divInventory}>
                  <div className={s.divQuant}>
                    <button 
                      className={s.buttonQuant}
                    >-</button>
                    <input 
                      type="number" 
                      className={s.inputQuant}
                    />
                    <button 
                      className={s.buttonQuant}
                    >+</button>
                    <button className={s.buttonDelete}>x</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={s.divActions}>
          <button className={s.btnCancel} onClick={onClose}>Cancelar</button>
          <button className={s.btnSave}>Guardar cambios</button>
        </div>
      </div>
    </div>
  )
};


export default DetailCart;
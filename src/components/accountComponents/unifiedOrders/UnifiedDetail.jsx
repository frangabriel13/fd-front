import s from './UnifiedDetail.module.css';
import { formatPrice } from '../../../utils/utils';

const UnifiedDetail = ({ order, onClose }) => {
  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div className={s.modal} onClick={handleClickOutside}>
      <div className={s.modalContent}>
        <div className={s.container}>
          <div className={s.divTitle}>
            <h3>Detalle de la orden #{order.id}</h3>
          </div>
          <div className={s.divTable}>
            {order.subOrders && order.subOrders.length > 0 && order.subOrders.map((subOrder, index) => (
              <div key={index} className={s.divSuborder}>
                <h4>{subOrder.user.manufacturer.name} - suborden #{subOrder.id}</h4>
                <div className={s.divProdPack}>
                  {subOrder.products && subOrder.products.length > 0 && (
                    <div className={s.tableSection}>
                      <h4>Productos</h4>
                      <table className={s.table}>
                        <thead>
                          <tr>
                            <th>Nombre</th>
                            <th>Talle</th>
                            <th>Color</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                          </tr>
                        </thead>
                        <tbody>
                          {subOrder.products.map((product, index) => (
                            product.inventories && product.inventories.length > 0 ? (
                              product.inventories.map((inventory, invIndex) => (
                                <tr key={`${index}-${invIndex}`}>
                                  <td>{product.name}</td>
                                  <td>{inventory.size}</td>
                                  <td>{inventory.color}</td>
                                  <td>{inventory.totalItem}</td>
                                  <td>{formatPrice(product.price)}</td>
                                </tr>
                              ))
                            ) : (
                              <tr key={index}>
                                <td>{product.name}</td>
                                <td colSpan="3">Sin inventarios</td>
                                <td>{formatPrice(product.price)}</td>
                              </tr>
                            )
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  {subOrder.packs && subOrder.packs.length > 0 && (
                    <div className={s.tableSection}>
                      <h4>Packs</h4>
                      <table className={s.table}>
                        <thead>
                          <tr>
                            <th>Nombre</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                          </tr>
                        </thead>
                        <tbody>
                          {subOrder.packs.map((pack, index) => (
                            <tr key={index}>
                              <td>{pack.name}</td>
                              <td>{pack.totalItem}</td>
                              <td>{formatPrice(pack.price)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
                <div className={s.divTotal}>
                  <h4>Subtotal: {formatPrice(subOrder.subtotal)}</h4>
                </div>
              </div>
            ))}
          </div>
          <div className={s.divTotalOrder}>
            <h4>Total: {formatPrice(order.total)}</h4>
          </div>
        </div>
        <div className={s.divActions}>
          <button className={s.btnCancel} onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  )
};


export default UnifiedDetail;
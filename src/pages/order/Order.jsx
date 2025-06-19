import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../../store/actions/orderActions';
import { formatPrice } from '../../utils/utils';
import s from './Order.module.css';

const Order = () => {
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const { selectedOrder, loading, error } = useSelector(state => state.order);

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderById(orderId));
    }
  }, [dispatch, orderId]);

  return (
    <div className={s.orderContainer}>
      <h1 className={s.title}>Detalle de la Orden</h1>
      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error}</p>}
      {selectedOrder ? (
        <div className={s.container}>
          <div className={s.divTitle}>
            <h3>Detalle de la orden #{selectedOrder.id}</h3>
          </div>
          <div className={s.divTable}>
            {selectedOrder.subOrders && selectedOrder.subOrders.length > 0 && selectedOrder.subOrders.map((subOrder, index) => (
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
            <h4>Total: {formatPrice(selectedOrder.total)}</h4>
          </div>
        </div>
      ) : (
        !loading && <p>No se encontró la orden.</p>
      )}
    </div>
  );
};


export default Order;
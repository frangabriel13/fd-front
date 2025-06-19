import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../../store/actions/orderActions';
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
      <h1 className={s.title}>Order Page</h1>
      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error}</p>}
      {selectedOrder ? (
        <div>
          <h2>Orden #{selectedOrder.id}</h2>
          {/* Muestra aquí los datos relevantes de la orden */}
          <pre>{JSON.stringify(selectedOrder, null, 2)}</pre>
        </div>
      ) : (
        !loading && <p>No se encontró la orden.</p>
      )}
    </div>
  );
};


export default Order;
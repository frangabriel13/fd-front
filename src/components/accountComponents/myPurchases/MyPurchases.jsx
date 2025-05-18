import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrders, deleteOrder } from '../../../store/actions/orderActions';
import s from './MyPurchases.module.css';
import TablePurchases from './TablePurchases';

const MyPurchases = () => {
  const dispatch = useDispatch();
  const myOrders = useSelector(state => state.order.myOrders);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  const handleDeleteOrder = (orderId) => {
    dispatch(deleteOrder(orderId));
  };

  return (
    <div className={s.container}>
      <TablePurchases myOrders={myOrders} onDeleteOrder={handleDeleteOrder} />
    </div>
  )
};


export default MyPurchases;
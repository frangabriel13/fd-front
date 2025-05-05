import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMySubOrders, getMyOrders } from '../../../store/actions/orderActions';
import s from './MyPurchases.module.css';
import TablePurchases from './TablePurchases';

const MyPurchases = () => {
  const dispatch = useDispatch();
  const myOrders = useSelector(state => state.order.myOrders);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  return (
    <div className={s.container}>
      <TablePurchases myOrders={myOrders} />
    </div>
  )
};


export default MyPurchases;
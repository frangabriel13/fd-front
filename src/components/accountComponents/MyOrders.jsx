import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMySubOrders, getMyOrders } from '../../store/actions/orderActions';
import s from './MyOrders.module.css';
import TableMyOrders from './myOrders/TableMyOrders';

const MyOrders = () => {
  const dispatch = useDispatch();
  const mySubOrders = useSelector(state => state.order.mySubOrders);

  useEffect(() => {
    dispatch(getMySubOrders());
  }, [dispatch]);

  return (
    <div className={s.container}>
      <TableMyOrders mySubOrders={mySubOrders} />
    </div>
  )
};


export default MyOrders;
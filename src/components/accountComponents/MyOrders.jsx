import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './MyOrders.module.css';
import TableMyOrders from './myOrders/TableMyOrders';

const MyOrders = () => {
  const dispatch = useDispatch();

  return (
    <div className={s.container}>
      <TableMyOrders />
    </div>
  )
};


export default MyOrders;
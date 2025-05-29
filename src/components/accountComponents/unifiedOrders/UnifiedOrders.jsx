import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllUnifiedOrders } from '../../../store/actions/unifiedOrderActions';
import TableUnified from './TableUnified';
import s from './UnifiedOrders.module.css';

const UnifiedOrders = () => {
  const dispatch = useDispatch();

  return (
    <div className={s.container}>
      <h1 className={s.title}>Pedidos Unificados</h1>
      <TableUnified />
    </div>
  );
};


export default UnifiedOrders;
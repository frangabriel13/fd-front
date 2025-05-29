import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUnifiedOrders } from '../../../store/actions/orderActions';
import TableUnified from './TableUnified';
import s from './UnifiedOrders.module.css';

const UnifiedOrders = () => {
  const dispatch = useDispatch();
  const { unifiedOrders = [], total, totalPages, page } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getUnifiedOrders(page));
  }, [dispatch, page]);

  const handlePageChange = (newPage) => {
    dispatch(getUnifiedOrders(newPage));
  };

  return (
    <div className={s.container}>
      <TableUnified
        unifiedOrders={unifiedOrders}
        total={total}
        totalPages={totalPages}
        page={page}
        onPageChange={handlePageChange}
      />
    </div>
  );
};


export default UnifiedOrders;
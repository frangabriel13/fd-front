import TableUnified from './TableUnified';
import s from './UnifiedOrders.module.css';

const UnifiedOrders = () => {
  return (
    <div className={s.container}>
      <h1 className={s.title}>Pedidos Unificados</h1>
      <TableUnified />
    </div>
  );
};


export default UnifiedOrders;
import { useState } from 'react';
import Pagination from '../../Pagination/Pagination';
import s from './TableUnified.module.css';

const TableUnified = ({ unifiedOrders, total, totalPage, page, onPageChange }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalType, setModalType] = useState(null);

  const handleOpenModal = (order, type) => {
    setSelectedOrder(order);
    setModalType(type);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setModalType(null);
  };

  console.log(unifiedOrders);

  return (
    <div className={s.container}>
      <h3>Pedidos unificados</h3>
      <table className={s.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Total</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th className={s.thActions}>Acciones</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  )
};


export default TableUnified;
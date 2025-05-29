import { useState } from 'react';
import Pagination from '../../Pagination/Pagination';
import { formatPrice, formatDateAndTime, contactWspOrder } from "../../../utils/utils";
import s from './TableUnified.module.css';
import UnifiedDetail from './UnifiedDetail';

const TableUnified = ({ unifiedOrders, total, totalPages, page, onPageChange }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
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
        <tbody>
          {unifiedOrders && unifiedOrders.length > 0 ? unifiedOrders.map(order => {
            if (!order) return null;
            const { formattedDate, formattedTime } = formatDateAndTime(order.createdAt);
            return (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{formatPrice(order.total)}</td>
                <td>{formattedDate}</td>
                <td>{formattedTime}</td>
                <td className={s.tdActions}>
                  <button className={s.btnEdit} onClick={() => openModal(order)}>Ver</button>
                </td>
              </tr>
            );
          }) : (
            <tr>
              <td colSpan={6}>No hay pedidos unificados.</td>
            </tr>
          )}
        </tbody>
      </table>
      {isModalOpen && selectedOrder && (
        <UnifiedDetail order={selectedOrder} onClose={closeModal} />
      )}
      <Pagination
        currentPage={page}
        onChange={onPageChange}
        totalProducts={total}
        pageSize={15}
      />
    </div>
  )
};


export default TableUnified;
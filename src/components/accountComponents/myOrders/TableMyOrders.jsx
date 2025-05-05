import { useState } from 'react';
import s from './TableMyOrders.module.css';
import { formatPrice, formatDateAndTime } from '../../../utils/utils';
import SubOrderDetail from './SubOrderDetail';

const TableMyOrders = ({ mySubOrders }) => {
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

  return (
    <div className={s.container}>
      <h3>Mis Ordenes</h3>
      <div className={s.divData}>
        <div className={s.divOrders}>
          <table className={s.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>ARS</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Comprador</th>
                <th>Teléfono</th>
                <th className={s.thActions}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {mySubOrders.map(order => {
                if (!order || !order.order) {
                  return null; // Ignorar órdenes inválidas
                }

                const { formattedDate, formattedTime } = formatDateAndTime(order.createdAt);
                const buyerName = order.order.userData
                  ? order.order.userData.name
                  : (order.order.user?.wholesaler?.name || order.order.user?.manufacturer?.name || 'Desconocido');
                const buyerPhone = order.order.userData
                  ? order.order.userData.phone
                  : (order.order.user?.wholesaler?.phone || order.order.user?.manufacturer?.phone || 'N/A');

                return (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{formatPrice(order.subtotal)}</td>
                    <td>{formattedDate}</td>
                    <td>{formattedTime}</td>
                    <td>{buyerName}</td>
                    <td>{buyerPhone}</td>
                    <td className={s.tdActions}>
                      <button className={s.btnEdit} onClick={() => openModal(order)}>Ver</button>
                      <button className={s.btnDelete}>Contactar</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && <SubOrderDetail subOrder={selectedOrder} onClose={closeModal} />}
    </div>
  )
};


export default TableMyOrders;
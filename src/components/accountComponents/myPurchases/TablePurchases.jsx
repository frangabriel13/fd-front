import { useState } from "react";
import s from "./TablePurchases.module.css";
import { formatPrice, formatDateAndTime } from "../../../utils/utils";
import OrderDetail from "./OrderDetail";

const TablePurchases = ({ myOrders }) => {
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
      <h3>Mis compras</h3>
      <div className={s.divData}>
        <div className={s.divPurchases}>
          <table className={s.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>ARS</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th className={s.thActions}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {myOrders.map(order => {
                if (!order || !order.subOrders) {
                  return null; // Ignorar órdenes inválidas
                }

                const { formattedDate, formattedTime } = formatDateAndTime(order.createdAt);

                return (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{formatPrice(order.total)}</td>
                    <td>{formattedDate}</td>
                    <td>{formattedTime}</td>
                    <td className={s.tdActions}>
                      <button className={s.btnEdit} onClick={() => openModal(order)}>Ver</button>
                      <button className={s.btnEdit}>Contactar</button>
                      <button className={s.btnDelete}>Eliminar</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && selectedOrder && (
        <OrderDetail order={selectedOrder} onClose={closeModal} />
      )}
    </div>
  )
};


export default TablePurchases;
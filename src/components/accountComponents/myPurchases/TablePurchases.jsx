import { useState } from "react";
import s from "./TablePurchases.module.css";
import { formatPrice, formatDateAndTime, contactWspOrder } from "../../../utils/utils";
import OrderDetail from "./OrderDetail";

const TablePurchases = ({ myOrders, onDeleteOrder }) => {
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

  const handleContact = (order) => {
    console.log('order', order);
    const manufacturerName = order.subOrders[0].user?.manufacturer?.name || "Desconocido";
    const manufacturerPhone = order.subOrders[0].user?.manufacturer?.phone || "N/A";
    const orderId = order.id;
    contactWspOrder(manufacturerName, manufacturerPhone, orderId);
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
                <th>Unificado</th>
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
                    <td>{order.unifique ? "Sí" : "No"}</td>
                    <td className={s.tdActions}>
                      <button className={s.btnEdit} onClick={() => openModal(order)}>Ver</button>
                      <button className={s.btnEdit} onClick={() => handleContact(order)}>Contactar</button>
                      <button className={s.btnDelete} onClick={() => onDeleteOrder(order.id)}>Eliminar</button>
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
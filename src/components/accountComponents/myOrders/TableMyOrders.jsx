import { useState } from 'react';
import s from './TableMyOrders.module.css';
import { formatPrice, formatDateAndTime } from '../../../utils/utils';

const TableMyOrders = ({ mySubOrders }) => {
  console.log('My SubOrders:', mySubOrders);
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
              {
                mySubOrders.map(order => {
                  const { formattedDate, formattedTime } = formatDateAndTime(order.createdAt);
                  const buyerName = order.order.userData 
                    ? order.order.userData.name 
                    : (order.order.user.wholesaler?.name || order.order.user.manufacturer?.name || 'Desconocido');
                  const buyerPhone = order.order.userData 
                    ? order.order.userData.phone 
                    : (order.order.user.wholesaler?.phone || order.order.user.manufacturer?.phone || 'N/A');
                  return (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{formatPrice(order.subtotal)}</td>
                      <td>{formattedDate}</td>
                      <td>{formattedTime}</td>
                      <td>{buyerName}</td>
                      <td>{buyerPhone}</td>
                      <td className={s.tdActions}>
                        <button className={s.btnEdit}>Ver</button>
                        <button className={s.btnDelete}>Eliminar</button>
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
};


export default TableMyOrders;
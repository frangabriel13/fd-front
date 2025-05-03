import { useState } from 'react';
import s from './TableMyOrders.module.css';
import { formatPrice } from '../../../utils/utils';

const TableMyOrders = ({ mySubOrders }) => {
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
                <th className={s.thActions}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                mySubOrders.map(order => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{formatPrice(order.subtotal)}</td>
                    <td className={s.tdActions}>
                      <button className={s.btnEdit}>Ver</button>
                      <button className={s.btnDelete}>Eliminar</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
};


export default TableMyOrders;
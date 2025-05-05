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
                <th>Comprador</th>
                <th>Teléfono</th>
                <th className={s.thActions}>Acciones</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
};


export default TablePurchases;
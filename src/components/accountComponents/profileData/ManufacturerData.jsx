import { useState } from 'react';
import EditManufacturer from './editData/EditManufacturer';
import s from './ManufacturerData.module.css';

const ManufacturerData = ({ user }) => {
  const [editModal, setEditModal] = useState(false);

  const handleEdit = () => {
    setEditModal(true);
  }

  const closeModal = () => {
    setEditModal(false);
  }

  return (
    <div className={s.container}>
      <h3>Información del fabricante</h3>
      <div className={s.divData}>
        <div className={s.divInput}>
          <h4>Nombre de la tienda</h4>
          <p>{user.manufacturer.name}</p>
        </div>
        <div className={s.divInput}>
          <h4>Nombre del dueño</h4>
          <p>{user.manufacturer.owner}</p>
        </div>
        <div className={s.divInput}>
          <h4>Número de teléfono</h4>
          <p>{user.manufacturer.phone}</p>
        </div>
        <div className={s.divInput}>
          <h4>Punto de venta</h4>
          <p>{user.manufacturer.pointOfSale ? 'Sí' : 'No'}</p>
        </div>
        <div className={s.divInput}>
          <h4>Dirección</h4>
          <p>{user.manufacturer.street}</p>
        </div>
        <div className={s.divInput}>
          <h4>Compra mínima</h4>
          <p>${user.manufacturer.minPurchase}</p>
        </div>
        <div className={s.divInput}>
          <h4>TikTok URL</h4>
          <p>{user.manufacturer.tiktokUrl}</p>
        </div>
        <div className={s.divInput}>
          <h4>Instagram URL</h4>
          <p>{user.manufacturer.instagramNick}</p>
        </div>
      </div>
      <hr className={s.divider} />
      <div className={s.divBtn}>
        <button className={s.btnEdit} onClick={handleEdit}>Editar</button>
      </div>
      {
        editModal && (
          <EditManufacturer user={user} closeModal={closeModal} />
        )
      }
    </div>
  )
};


export default ManufacturerData;
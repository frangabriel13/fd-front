import { useState } from 'react';
import s from './ManufacturerData.module.css';

const ManufacturerData = ({ user }) => {
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
      </div>
    </div>
  )
};


export default ManufacturerData;
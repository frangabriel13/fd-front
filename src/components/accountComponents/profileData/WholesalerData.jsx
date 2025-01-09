import s from './WholesalerData.module.css';

const WholesalerData = ({ user }) => {
  return (
    <div className={s.container}>
      <h3>Información del mayorista</h3>
      <div className={s.divData}>
        <div className={s.divInput}>
          <h4>Nombre</h4>
          <p>{user.wholesaler.name}</p>
        </div>
        <div className={s.divInput}>
          <h4>Número de teléfono</h4>
          <p>{user.wholesaler.phone}</p>
        </div>
        <div className={s.divInput}>
          <h4>Dirección</h4>
          <p>{user.wholesaler.street}</p>
        </div>
        <div className={s.divInput}>
          <h4>Ciudad</h4>
          <p>{user.wholesaler.city}</p>
        </div>
        <div className={s.divInput}>
          <h4>Provincia</h4>
          <p>{user.wholesaler.province}</p>
        </div>
        <div className={s.divInput}>
          <h4>Código postal</h4>
          <p>{user.wholesaler.postalCode}</p>
        </div>
        <div className={s.divInput}>
          <h4>País</h4>
          <p>{user.wholesaler.country}</p>
        </div>
      </div>
    </div>
  )
}


export default WholesalerData;
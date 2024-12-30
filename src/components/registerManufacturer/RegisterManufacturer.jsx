import { useState } from 'react';
import s from './RegisterManufacturer.module.css';

const RegisterManufacturer = () => {
  const [hasPointOfSale, setHasPointOfSale] = useState(false);

  const handleHasPointOfSale = () => {
    setHasPointOfSale(!hasPointOfSale);
  };

  return (
    <div className={s.container}>
      <h3>Datos del Fabricante</h3>
      <form className={s.form}>
        <div className={s.divInputs}>
          <div className={s.divInput}>
            <h4>Nombre del fabricante</h4>
            <input className={s.input} type="text" />
          </div>
          <div className={s.divInput}>
            <h4>Nombre de la tienda</h4>
            <input className={s.input} type="text" />
          </div>
        </div>
        <div className={s.divInputs}>
          <div className={s.divInput}>
            <h4>Número de teléfono</h4>
            <input className={s.input} type="text" />
          </div>
          <div className={s.divInput}>
            <h4>Mínimo de compra</h4>
            <input className={s.input} type="text" />
          </div>
        </div>
        <div className={s.divInputAddress}>
          <div className={s.divInputCheck}>
            <h4>¿Cuénta con punto de venta?</h4>
            <input 
              className={s.inputCheck}
              type="checkbox"
              checked={hasPointOfSale}
              onChange={handleHasPointOfSale}
            />
          </div>
          <div className={s.inputAddress}>
            <h4>Dirección</h4>
            <input 
              className={`${s.input} ${!hasPointOfSale ? s.inputDisabled : ''}`} 
              type="text" 
              disabled={!hasPointOfSale} 
            />
          </div>
        </div>
        <div className={s.divBtn}>
          <button className={s.btnForm}>Completar Registro</button>
        </div>
      </form>
    </div>
  )
};


export default RegisterManufacturer;
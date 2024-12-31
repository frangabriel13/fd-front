import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createManufacturer } from '../../store/actions/manufacturerActions';
import s from './RegisterManufacturer.module.css';

const RegisterManufacturer = () => {
  const dispatch = useDispatch();
  const [hasPointOfSale, setHasPointOfSale] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    owner: '',
    pointOfSale: false,
    street: '',
    phone: '',
    minimumPurchase: 0,
  });

  const handleHasPointOfSale = () => {
    setHasPointOfSale(!hasPointOfSale);
    setFormData({
      ...formData,
      pointOfSale: !hasPointOfSale,
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createManufacturer(formData));
  };

  return (
    <div className={s.container}>
      <h3>Datos del Fabricante</h3>
      <form className={s.form} onSubmit={handleSubmit}>
        <div className={s.divInputs}>
          <div className={s.divInput}>
            <h4>Nombre del fabricante</h4>
            <input 
              className={s.input}
              type="text"
              name="owner"
              value={formData.owner}
              onChange={handleInputChange}
            />
          </div>
          <div className={s.divInput}>
            <h4>Nombre de la tienda</h4>
            <input 
              className={s.input} 
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={s.divInputs}>
          <div className={s.divInput}>
            <h4>Número de teléfono</h4>
            <input 
              className={s.input} 
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className={s.divInput}>
            <h4>Mínimo de compra</h4>
            <input 
              className={s.input}
              type="number"
              name="minimumPurchase"
              value={formData.minimumPurchase}
              onChange={handleInputChange}
            />
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
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createManufacturer } from '../../store/actions/manufacturerActions';
import { registerManufacturerValidator } from '../../utils/validations';
import s from './RegisterManufacturer.module.css';

const RegisterManufacturer = ({ user }) => {
  const dispatch = useDispatch();
  const [hasPointOfSale, setHasPointOfSale] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    owner: '',
    pointOfSale: false,
    street: '',
    phone: '',
    minPurchase: 0,
    userId: user.userId,
  });
  const [errors, setErrors] = useState({});
  console.log('owner component', formData.owner);
  console.log('street component', formData.street);

  const handleHasPointOfSale = () => {
    setHasPointOfSale(!hasPointOfSale);
    setFormData({
      ...formData,
      pointOfSale: !hasPointOfSale,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'minPurchase' ? Number(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = registerManufacturerValidator(formData);
    if(Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      dispatch(createManufacturer(formData));
    }
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
            {errors.owner && <p className={s.error}>{errors.owner}</p>}
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
            {errors.name && <p className={s.error}>{errors.name}</p>}
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
            {errors.phone && <p className={s.error}>{errors.phone}</p>}
          </div>
          <div className={s.divInput}>
            <h4>Mínimo de compra</h4>
            <input 
              className={s.input}
              type="number"
              name="minPurchase"
              value={formData.minPurchase}
              onChange={handleInputChange}
            />
            {errors.minPurchase && <p className={s.error}>{errors.minPurchase}</p>}
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
            {errors.pointOfSale && <p className={s.error}>{errors.pointOfSale}</p>}
          </div>
          <div className={s.inputAddress}>
            <h4>Dirección</h4>
            <input 
              className={`${s.input} ${!hasPointOfSale ? s.inputDisabled : ''}`} 
              type="text" 
              disabled={!hasPointOfSale}
              name="street"
              value={formData.street}
              onChange={handleInputChange}
            />
            {errors.street && <p className={s.error}>{errors.street}</p>}
          </div>
        </div>
        <div className={s.divBtn}>
          <button className={s.btnForm} type='submit'>Completar Registro</button>
        </div>
      </form>
    </div>
  )
};


export default RegisterManufacturer;
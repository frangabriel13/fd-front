import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateManufacturer } from '../../../store/actions/adminActions';
import s from './EditManufacturer.module.css';

const EditManufacturer = ({ user, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    street: user.manufacturer.street || '',
    pointOfSale: user.manufacturer.pointOfSale || false,
  });
  const [errors, setErrors] = useState({});

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {}; // Add your validation logic here

    if (formData.pointOfSale) {
      if (!formData.street || formData.street.trim().length < 5) {
        validationErrors.street = "La dirección es obligatoria y debe tener al menos 5 caracteres.";
      }
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      const dataToSubmit = { ...formData };
      if (!dataToSubmit.pointOfSale) {
        delete dataToSubmit.street;
      }
      dispatch(updateManufacturer(user.manufacturer.id, dataToSubmit));
      onClose();
    }
  };

  console.log('user', user);

  return (
    <div className={s.modal} onClick={handleClickOutside}>
      <div className={s.modalContent}>
        <div className={s.container}>
          <h3>Editar información</h3>
          <form className={s.form} onSubmit={handleSubmit}>
            <div className={s.divInputAddress}>
              <div className={s.divInputCheck}>
                <h4>¿Cuénta con punto de venta?</h4>
                <input
                  className={s.inputCheck}
                  type="checkbox"
                  name="pointOfSale"
                  checked={formData.pointOfSale}
                  onChange={handleChange}
                />
              </div>
              <div className={s.inputAddress}>
                <h4>Dirección</h4>
                <input
                  className={`${s.input} ${!formData.pointOfSale ? s.inputDisabled : ''}`}
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  disabled={!formData.pointOfSale}
                />
                {errors.street && <p className={s.error}>{errors.street}</p>}
              </div>
            </div>
            <div className={s.divBtn}>
              <button 
                className={s.btnCancel}
                type='button' 
                onClick={onClose}
              >Cancelar</button>
              <button 
                className={s.btnForm} 
                type='submit'
              >Guardar cambios</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
};


export default EditManufacturer;
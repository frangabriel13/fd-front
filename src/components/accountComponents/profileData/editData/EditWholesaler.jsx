import { useState } from 'react';
import { useDispatch } from 'react-redux';
import s from './EditWholesaler.module.css';
import { updateWholesaler } from '../../../../store/actions/wholesalerActions';
import { editWholesalerValidator } from '../../../../utils/validations';

const EditWholesaler = ({ user, closeModal }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: user.wholesaler.name || '',
    phone: user.wholesaler.phone || '',
    street: user.wholesaler.street || '',
    city: user.wholesaler.city || '',
    province: user.wholesaler.province || '',
    postalCode: user.wholesaler.postalCode || '',
    country: user.wholesaler.country || '',
  });
  const [errors, setErrors] = useState({});

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = editWholesalerValidator(formData);
    if(Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      dispatch(updateWholesaler(user.wholesaler.id, formData));
      closeModal();
    }
  };

  return (
    <div className={s.modal} onClick={handleClickOutside}>
      <div className={s.modalContent}>
        <div className={s.container}>
          <div className={s.container}>
            <h3>Editar Información</h3>
            <form className={s.form} onSubmit={handleSubmit}>
              <div className={s.divInputs}>
                <div className={s.divInput}>
                  <h4>Nombre del mayorista</h4>
                  <input
                    className={s.input}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <p className={s.error}>{errors.name}</p>}
                </div>
                <div className={s.divInput}>
                  <h4>Número de teléfono</h4>
                  <input
                    className={s.input}
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && <p className={s.error}>{errors.phone}</p>}
                </div>
              </div>
              <div className={s.divInputs}>
                <div className={s.divInput}>
                  <h4>Dirección</h4>
                  <input
                    className={s.input}
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                  />
                  {errors.street && <p className={s.error}>{errors.street}</p>}
                </div>
                <div className={s.divInput}>
                  <h4>Ciudad</h4>
                  <input
                    className={s.input}
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                  {errors.city && <p className={s.error}>{errors.city}</p>}
                </div>
              </div>
              <div className={s.divInputs}>
                <div className={s.divInput}>
                  <h4>Provincia</h4>
                  <input
                    className={s.input}
                    type="text"
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                  />
                  {errors.province && <p className={s.error}>{errors.province}</p>}
                </div>
                <div className={s.divInput}>
                  <h4>Código Postal</h4>
                  <input
                    className={s.input}
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                  />
                  {errors.postalCode && <p className={s.error}>{errors.postalCode}</p>}
                </div>
              </div>
              <div className={s.divInputTikTok}>
                <div className={s.divInput}>
                  <h4>País</h4>
                  <input
                    className={s.input}
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  />
                  {errors.country && <p className={s.error}>{errors.country}</p>}
                </div>
              </div>
              <div className={s.divBtn}>
                <button className={s.btnCancel} onClick={closeModal}>Cancelar</button>
                <button className={s.btnForm} type='submit'>Guardar cambios</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
};


export default EditWholesaler;
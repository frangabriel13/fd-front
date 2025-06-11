import { useState } from 'react';
import { useDispatch } from 'react-redux';
import s from './EditManufacturer.module.css';
import { updateManufacturer } from '../../../../store/actions/manufacturerActions';
import { editManufacturerValidator } from '../../../../utils/validations';
import { nicknameToUrl, urlToNickname } from '../../../../utils/utils';

const EditManufacturer = ({ user, closeModal }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    owner: user.manufacturer.owner || '',
    name: user.manufacturer.name || '',
    phone: user.manufacturer.phone || '',
    minPurchase: user.manufacturer.minPurchase || 0,
    pointOfSale: user.manufacturer.pointOfSale || false,
    street: user.manufacturer.street || '',
    // tiktokUrl: user.manufacturer.tiktokUrl || '',
    tiktokUrl: user.manufacturer.tiktokUrl ? urlToNickname(user.manufacturer.tiktokUrl) : '',
    instagramNick: user.manufacturer.instagramNick || '',
    description: user.manufacturer.description || '',
  });
  const [errors, setErrors] = useState({});

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
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
    const validationErrors = editManufacturerValidator(formData);
    if(Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      const dataToSubmit = { ...formData };
      if (!dataToSubmit.pointOfSale) {
        delete dataToSubmit.street;
      }
      if (dataToSubmit.tiktokUrl) {
        dataToSubmit.tiktokUrl = nicknameToUrl(dataToSubmit.tiktokUrl);
      } else {
        dataToSubmit.tiktokUrl = null;
      }
      if (!dataToSubmit.instagramNick) {
        dataToSubmit.instagramNick = null;
      }
      dispatch(updateManufacturer(user.manufacturer.id, dataToSubmit));
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
                  <h4>Nombre del fabricante</h4>
                  <input
                    className={s.input}
                    type="text"
                    name="owner"
                    value={formData.owner}
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
              {/* <div className={s.divInputTikTok}> */}
              <div className={s.divInputs}>
                <div className={s.divInput}>
                  <h4>Usuario de TikTok</h4>
                  <input
                    className={s.input}
                    type="text"
                    name="tiktokUrl"
                    value={formData.tiktokUrl}
                    onChange={handleChange}
                  />
                  {errors.tiktokUrl && <p className={s.error}>{errors.tiktokUrl}</p>}
                </div>
                <div className={s.divInput}>
                  <h4>Usuario de Instagram</h4>
                  <input
                    className={s.input}
                    type="text"
                    name="instagramNick"
                    value={formData.instagramNick}
                    onChange={handleChange}
                  />
                  {errors.instagramNick && <p className={s.error}>{errors.instagramNick}</p>}
                </div>
              </div>
              <div className={s.divDescription}>
                <h4 className={s.label}>Descripción</h4>
                <textarea
                  className={s.textarea}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                />
                {errors.description && <p className={s.error}>{errors.description}</p>}
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


export default EditManufacturer;
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import s from './EditData.module.css';
import { editDataCart } from '../../store/actions/cartActions';

const EditData = ({ dataUser = {}, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: dataUser.name || "",
    phone: dataUser.phone || ""
  });
  const [errors, setErrors] = useState({});

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre no puede estar vacío.";
    } else if (formData.name.length < 3) {
      newErrors.name = "El nombre debe tener al menos 3 caracteres.";
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "El número de teléfono debe tener exactamente 10 dígitos.";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    dispatch(editDataCart(formData));
    onClose();
  };

  return (
    <div className={s.modal} onClick={handleClickOutside}>
      <div className={s.modalContent}>
        <div className={s.container}>
          <div className={s.divTitle}>
            <h3>Editar Datos</h3>
            <p>Rellena los siguientes datos para que puedan ser usados al generar la orden.</p>
          </div>
          <form className={s.form} onSubmit={handleSubmit}>
            <div className={s.divInputs}>
              <div className={s.divInput}>
                <h4>Nombre</h4>
                <input
                  className={s.input}
                  type="text"
                  id="name"
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
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <p className={s.error}>{errors.phone}</p>}
              </div>
            </div>
            <hr className={s.divider} />
            <div className={s.divBtn}>
              <button className={s.btnCancel} type="button" onClick={onClose}>Cancelar</button>
              <button className={s.btnForm} type='submit'>Guardar cambios</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
};


export default EditData;
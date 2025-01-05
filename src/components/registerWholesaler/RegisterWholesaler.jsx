import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createWholesaler } from '../../store/actions/wholesalerActions';
import { registerWholesalerValidator } from '../../utils/validations';
import s from './RegisterWholesaler.module.css';

const RegisterWholesaler = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    userId: user.userId,
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = registerWholesalerValidator(formData);
    if(Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      dispatch(createWholesaler(formData));
      setFormData({
        name: '',
        phone: '',
        userId: user.userId,
      });
      navigate('/mi-cuenta');
    }
  };

  return (
    <div className={s.container}>
      <h3>Datos del Mayorista</h3>
      <form className={s.form} onSubmit={handleSubmit}>
        <div className={s.divInputs}>
          <div className={s.divInput}>
            <h4>Nombre del mayorista</h4>
            <input 
              className={s.input}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
            />
            {errors.phone && <p className={s.error}>{errors.phone}</p>}
          </div>
        </div>
        <div className={s.divBtn}>
          <button className={s.btnForm} type='submit'>Completar Registro</button>
        </div>
      </form>
    </div>
  )
};


export default RegisterWholesaler;
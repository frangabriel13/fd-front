import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../store/actions/userActions';
import { registerUserValidator } from '../../utils/validations';
import s from './Register.module.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = registerUserValidator(email, password, confirmPassword);
    if(Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      dispatch(registerUser(email, password));
    }
  };

  return (
    <div className={s.container}>
      <div className={s.divTitle}>
        <h2 className={s.title}>Ingresa tu e-mail y contraseña para crear una cuenta</h2>
      </div>
      <div className={s.divForm}>
        <form className={s.form} onSubmit={handleSubmit}>
          <div className={s.divInput}>
            <h3>E-mail</h3>
            <input 
              type="email" 
              placeholder="Email" 
              className={s.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className={s.error}>{errors.email}</p>}
          </div>
          <div className={s.divInput}>
            <h3>Contraseña</h3>
            <input 
              type="password" 
              placeholder="Contraseña" 
              className={s.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className={s.error}>{errors.password}</p>}
          </div>
          <div className={s.divInput}>
            <h3>Repetir contraseña</h3>
            <input 
              type="password" 
              placeholder="Contraseña" 
              className={s.input}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && <p className={s.error}>{errors.confirmPassword}</p>}
          </div>
          <button type="submit" className={s.button}>Registrarse</button>
        </form>
      </div>
    </div>
  );
};


export default Register;
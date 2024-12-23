import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../store/actions/authActions';
import s from './ForgotPassword.module.css';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(forgotPassword(email));
    if(response.success) {
      setMessage('Se ha enviado un correo con el enlace para resetear la contraseña.');
      setError('');
    } else {
      setError(response.message);
      setMessage('');
    }
  }

  return (
    <div className={s.container}>
      <div className={s.divTitle}>
        <h2 className={s.title}>Ingresa tu e-mail para recuperar tu contraseña</h2>
        <p className={s.info}>Se te enviará un correo al e-mail especificado con el enlace para resetear la contraseña</p>
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
          </div>
          {message && <p className={s.succes}>{message}</p>}
          {error && <p className={s.error}>{error}</p>}
          <button type="submit" className={s.button}>Enviar</button>
        </form>
      </div>
    </div>
  )
};


export default ForgotPassword;
import s from './Register.module.css';
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const handleForgotPassword = () => {
    navigate('/recuperar-password');
  };

  return (
    <div className={s.container}>
      <div className={s.divTitle}>
        <h2 className={s.title}>Ingresa tu e-mail y contraseña para crear una cuenta</h2>
      </div>
      <div className={s.divForm}>
        <form className={s.form}>
          <div className={s.divInput}>
            <h3>E-mail</h3>
            <input type="email" placeholder="Email" className={s.input} />
          </div>
          <div className={s.divInput}>
            <h3>Contraseña</h3>
            <input type="password" placeholder="Contraseña" className={s.input} />
          </div>
          <div className={s.divInput}>
            <h3>Repetir contraseña</h3>
            <input type="password" placeholder="Contraseña" className={s.input} />
          </div>
          <button type="submit" className={s.button}>Registrarse</button>
        </form>
      </div>
    </div>
  );
};


export default Register;
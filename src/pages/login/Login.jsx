import s from './Login.module.css';
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleForgotPassword = () => {
    navigate('/recuperar-password');
  };

  const handleCreateAccount = () => {
    navigate('/registro');
  };

  return (
    <div className={s.container}>
      <div className={s.divTitle}>
        <h2 className={s.title}>Ingresa tu e-mail y contraseña para iniciar sesión</h2>
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
          <button type="submit" className={s.button}>Ingresar</button>
        </form>
        <div className={s.divBtns}>
          <button className={s.btnForgot} onClick={handleForgotPassword}>¿Olvidaste tu contraseña?</button>
          <button className={s.btnCreate} onClick={handleCreateAccount}>Crear cuenta</button>
          <button className={s.btnGoogle}>
            <FcGoogle className={s.googleIcon} /> Iniciar sesión con Google
          </button>
        </div>
      </div>
    </div>
  );
};


export default Login;
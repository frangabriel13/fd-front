import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../store/actions/authActions';
import { loginValidator } from '../../utils/validations';
import s from './Login.module.css';
import { FcGoogle } from "react-icons/fc";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };

    const validationErrors = loginValidator(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const result = await dispatch(login(data));
    if(result.success) {
      navigate('/');
    } else {
      setErrors({ message: result.message, ...result.info });
    }
  };

  const handleForgotPassword = () => {
    navigate('/recuperar-password');
  };

  const handleCreateAccount = () => {
    navigate('/registro');
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={s.container}>
      <div className={s.divTitle}>
        <h2 className={s.title}>Ingresa tu e-mail y contraseña para iniciar sesión</h2>
      </div>
      <div className={s.divForm}>
        <form className={s.form} onSubmit={handleSubmit}>
          <div className={s.divInput}>
            <h3>E-mail</h3>
            <input 
              type="email" 
              className={s.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />
            {errors.email && <p className={s.error}>{errors.email}</p>}
          </div>
          <div className={s.divInput}>
            <h3>Contraseña</h3>
            <div className={s.divPass}>
              <input 
                type={showPassword ? "text" : "password"} 
                className={s.inputPass}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className={s.eyeIcon} onClick={handleShowPassword}>
                {showPassword ? <FaRegEyeSlash className={s.icon} /> : <FaRegEye className={s.icon} />}
              </span>
            </div>
            {errors.password && <p className={s.error}>{errors.password}</p>}
          </div>
          <button type="submit" className={s.button}>Ingresar</button>
          {errors.message && <p className={s.error}>{errors.message}</p>}
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
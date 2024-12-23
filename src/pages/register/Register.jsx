import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../store/actions/userActions';
import { registerUserValidator } from '../../utils/validations';
import s from './Register.module.css';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = registerUserValidator(email, password, confirmPassword);
    if(Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    const result = await dispatch(registerUser(email, password));
    setLoading(false);
    if(result.success) {
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setSuccessMessage('Se ha enviado un correo de verificación a tu e-mail. Serás redirigido a la página de inicio de sesión.');
      setErrors('');
      setTimeout(() => {
        navigate('/ingresar');
      }, 5000);
    } else {
      setErrors({ error: result.message });
    }
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
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
          <div className={s.divInput}>
            <h3>Repetir contraseña</h3>
            <div className={s.divPass}>
              <input 
                type={showPassword ? "text" : "password"}
                className={s.inputPass}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span className={s.eyeIcon} onClick={handleShowPassword}>
                {showPassword ? <FaRegEyeSlash className={s.icon} /> : <FaRegEye className={s.icon} />}
              </span>
            </div>
            {errors.confirmPassword && <p className={s.error}>{errors.confirmPassword}</p>}
          </div>
          <button type="submit" className={s.button} disabled={loading}>
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>
        {successMessage && <p className={s.success}>{successMessage}</p>}
        {errors.error && <p className={s.error}>{errors.error}</p>}
      </div>
    </div>
  );
};


export default Register;
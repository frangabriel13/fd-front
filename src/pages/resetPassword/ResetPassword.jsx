import {  useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../store/actions/authActions';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPasswordValidator } from '../../utils/validations';
import s from './ResetPassword.module.css';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = resetPasswordValidator(password, confirmPassword);
    if(Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const response = await dispatch(resetPassword(token, password));
    if(response.success) {
      setMessage("Constraseña restablecida correctamente. Redirigiendo a la página de inicio de sesión...");
      setErrors('');
      setTimeout(() => {
        navigate('/ingresar');
      }, 3000);
    } else {
      setMessage('');
      setErrors({ general: response.message }); // o resopnse.error
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={s.container}>
      <div className={s.divTitle}>
        <h2 className={s.title}>Ingresa tu nueva contraseña para restablecerla</h2>
      </div>
      <div className={s.divForm}>
        <form className={s.form} onSubmit={handleSubmit}>
          <div className={s.divInput}>
            <h3>Nueva contraseña</h3>
            <div className={s.divPass}>
              <input 
                type={showPassword ? "text" : "password"}
                name='password' 
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
          {errors.general && <p className={s.error}>{errors.general}</p>}
          <button type="submit" className={s.button}>Restablecer</button>
        </form>
        {message && <p className={s.message}>{message}</p>}
      </div>
    </div>
  )
};


export default ResetPassword;
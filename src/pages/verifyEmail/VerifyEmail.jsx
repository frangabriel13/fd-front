import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { verifyEmail } from '../../store/actions/userActions';
import s from './VerifyEmail.module.css';

const VerifyEmail = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { loading, error, isVerified } = useSelector(state => state.user);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    console.log('token', token);

    const verify = async () => {
      await dispatch(verifyEmail(token));
    };

    verify();
  }, [dispatch, location.search]);

  useEffect(() => {
    if (loading) {
      setMessage('Verificando tu cuenta...');
    } else if (isVerified) {
      setMessage('Tu cuenta ha sido verificada exitosamente. Serás redirigido a la página de inicio de sesión.');
      setTimeout(() => {
        navigate('/ingresar');
      }, 3000);
    } else if (error) {
      setMessage('Hubo un error al verificar tu cuenta. Por favor, intenta nuevamente.');
    }
  }, [loading, isVerified, error]);

  return (
    <div className={s.container}>
      <h2 className={s.message}>{message}</h2>
    </div>
  );
};

export default VerifyEmail;
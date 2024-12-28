import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/actions/authActions';
import s from './SidebarAccount.module.css';

const SidebarAccount = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={s.container}>
      <h3 className={s.title}>Mi cuenta</h3>
      <div className={s.menu}>
        <Link to="/mi-cuenta/subir-producto" className={s.link}>Subir producto</Link>
        <Link to="/mi-cuenta/publicaciones" className={s.link}>Publicaciones</Link>
        <Link to="/mi-cuenta/ordenes" className={s.link}>Mis ordenes</Link>
        <Link to="/mi-cuenta/perfil" className={s.link}>Mis perfil</Link>
        <button onClick={handleLogout} className={s.link}>Cerrar sesión</button>
      </div>
    </div>
  );
};


export default SidebarAccount;
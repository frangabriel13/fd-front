import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/actions/authActions';
import s from './SidebarAccount.module.css';
import { BsUpload, BsBoxSeam, BsTag } from "react-icons/bs";
import { PiUserCircle } from "react-icons/pi";
import { CiLogout } from "react-icons/ci";

const SidebarAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    setTimeout(() => {
      navigate('/ingresar');
    }, 1000);
  };

  return (
    <div className={s.container}>
      <div className={s.divTitle}>
        <h3 className={s.title}>Mi cuenta</h3>
      </div>
      <div className={s.menu}>
        <Link to="/mi-cuenta/subir-producto" className={s.link}>
          <BsUpload className={s.icon} /> Subir producto
        </Link>
        <Link to="/mi-cuenta/publicaciones" className={s.link}>
          <BsBoxSeam className={s.icon} /> Publicaciones
        </Link>
        <Link to="/mi-cuenta/ordenes" className={s.link}>
          <BsTag className={s.icon} /> Mis ordenes
        </Link>
        <Link to="/mi-cuenta/" className={s.link}>
          <PiUserCircle className={s.icon} /> Mi perfil
        </Link>
        <button onClick={handleLogout} className={s.btnLogout}>
          <CiLogout className={s.iconLogout} /> Cerrar sesión
        </button>
      </div>
    </div>
  );
};


export default SidebarAccount;
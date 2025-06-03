import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/actions/authActions';
import s from './SidebarAccount.module.css';
import { BsUpload, BsBoxSeam, BsTag, BsHeart, BsCart, BsClipboardCheck, BsPersonCheck } from "react-icons/bs";
import { LiaUsersCogSolid } from "react-icons/lia";
import { PiUserCircle } from "react-icons/pi";
import { CiLogout } from "react-icons/ci";

const SidebarAccount = ({ role }) => {
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
        {role === "manufacturer" && (
          <>
            <Link to="/mi-cuenta/subir-producto" className={s.link}>
              <BsUpload className={s.icon} /> Subir producto
            </Link>
            <Link to="/mi-cuenta/publicaciones" className={s.link}>
              <BsTag className={s.icon} /> Publicaciones
            </Link>
            <Link to="/mi-cuenta/packs" className={s.link}>
              <BsBoxSeam className={s.icon} /> Packs
            </Link>
            <Link to="/mi-cuenta/ordenes" className={s.link}>
              <BsClipboardCheck className={s.icon} /> Mis ordenes
            </Link>
          </>
        )}
        {role === "wholesaler" && (
          <>
            <Link to="/mi-cuenta/favoritos" className={s.link}>
              <BsHeart className={s.icon} /> Favoritos
            </Link>
            <Link to="/mi-cuenta/compras" className={s.link}>
              <BsCart className={s.icon} /> Mis compras
            </Link>
            <Link to="/mi-cuenta/seguidos" className={s.link}>
              <BsPersonCheck className={s.icon} /> Seguidos
            </Link>
          </>
        )}
        {role === "admin" && (
          <>
            <Link to="/mi-cuenta/usuarios" className={s.link}>
              <LiaUsersCogSolid className={s.icon} /> Usuarios
            </Link>
            <Link to="/mi-cuenta/ordenes-unificadas" className={s.link}>
              <BsBoxSeam className={s.icon} /> Pedidos unificados
            </Link>
          </>
        )}
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
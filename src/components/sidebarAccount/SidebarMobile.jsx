import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/actions/authActions';
import s from './SidebarMobile.module.css';
import { BsUpload, BsBoxSeam, BsTag, BsHeart, BsCart, BsClipboardCheck, BsPersonCheck } from "react-icons/bs";
import { LiaUsersCogSolid } from "react-icons/lia";
import { PiUserCircle } from "react-icons/pi";
import { CiLogout } from "react-icons/ci";

const SidebarMobile = ({ role }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    setTimeout(() => {
      navigate('/ingresar');
    }, 1000);
  }

  return (
    <div className={s.container}>
      {role === "manufacturer" && (
        <>
          <div className={s.tooltipContainer}>
            <Link to="/mi-cuenta/subir-producto" className={s.iconLink}>
              <BsUpload size={24} />
            </Link>
            <span className={s.tooltip}>Subir</span>
          </div>
          <div className={s.tooltipContainer}>
            <Link to="/mi-cuenta/publicaciones" className={s.iconLink}>
              <BsTag size={24} />
            </Link>
            <span className={s.tooltip}>Productos</span>
          </div>
          <div className={s.tooltipContainer}>
            <Link to="/mi-cuenta/packs" className={s.iconLink}>
              <BsBoxSeam size={24} />
            </Link>
            <span className={s.tooltip}>Combos</span>
          </div>
          <div className={s.tooltipContainer}>
            <Link to="/mi-cuenta/ordenes" className={s.iconLink}>
              <BsClipboardCheck size={24} />
            </Link>
            <span className={s.tooltip}>Órdenes</span>
          </div>
        </>
      )}
      {role === "wholesaler" && (
        <>
          <div className={s.tooltipContainer}>
            <Link to="/mi-cuenta/favoritos" className={s.iconLink}>
              <BsHeart size={24} />
            </Link>
            <span className={s.tooltip}>Favoritos</span>
          </div>
          <div className={s.tooltipContainer}>
            <Link to="/mi-cuenta/compras" className={s.iconLink} >
              <BsCart size={24} />
            </Link>
            <span className={s.tooltip}>Compras</span>
          </div>
          <div className={s.tooltipContainer}>
            <Link to="/mi-cuenta/seguidos" className={s.iconLink}>
              <BsPersonCheck size={24} />
            </Link>
            <span className={s.tooltip}>Seguidos</span>
          </div>
        </>
      )}
      {role === "admin" && (
        <>
          <div className={s.tooltipContainer}>
            <Link to="/mi-cuenta/usuarios" className={s.iconLink}>
              <LiaUsersCogSolid size={24} />
            </Link>
            <span className={s.tooltip}>Usuarios</span>
          </div>
          <div className={s.tooltipContainer}>
            <Link to="/mi-cuenta/ordenes-unificadas" className={s.iconLink}>
              <BsBoxSeam size={24} />
            </Link>
            <span className={s.tooltip}>Órdenes</span>
          </div>
        </>
      )}
      <div className={s.tooltipContainer}>
        <Link to="/mi-cuenta/" className={s.iconLink}>
          <PiUserCircle size={24} />
        </Link>
        <span className={s.tooltip}>Perfil</span>
      </div>
      <div className={s.tooltipContainer}>
        <button onClick={handleLogout} className={s.iconButton}>
          <CiLogout size={24} />
        </button>
        <span className={s.tooltip}>Salir</span>
      </div>
    </div>
  )
};


export default SidebarMobile;
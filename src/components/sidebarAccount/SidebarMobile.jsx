import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/actions/authActions';
import s from './SidebarMobile.module.css';
import { BsUpload, BsBoxSeam, BsTag, BsHeart, BsCart, BsClipboardCheck } from "react-icons/bs";
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
          <Link to="/mi-cuenta/subir-producto" className={s.iconLink}>
            <BsUpload size={24} />
          </Link>
          <Link to="/mi-cuenta/publicaciones" className={s.iconLink}>
            <BsTag size={24} />
          </Link>
          <Link to="/mi-cuenta/packs" className={s.iconLink}>
            <BsBoxSeam size={24} />
          </Link>
          <Link to="/mi-cuenta/ordenes" className={s.iconLink}>
            <BsClipboardCheck size={24} />
          </Link>
        </>
      )}
      {role === "wholesaler" && (
        <>
          <Link to="/mi-cuenta/favoritos" className={s.iconLink}>
            <BsHeart size={24} />
          </Link>
          <Link to="/mi-cuenta/compras" className={s.iconLink} >
            <BsCart size={24} />
          </Link>
        </>
      )}
      {role === "admin" && (
        <Link to="/mi-cuenta/usuarios" className={s.iconLink}>
          <LiaUsersCogSolid size={24} />
        </Link>
      )}
      <Link to="/mi-cuenta/" className={s.iconLink}>
        <PiUserCircle size={24} />
      </Link>
      <button onClick={handleLogout} className={s.iconButton}>
        <CiLogout size={24} />
      </button>
    </div>
  )
};


export default SidebarMobile;
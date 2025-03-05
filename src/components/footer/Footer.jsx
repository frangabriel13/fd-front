import { Link } from 'react-router-dom';
import s from './Footer.module.css';
import logo from '../../assets/logo.jpg';

const Footer = () => {
  return (
    <div className={s.container}>
      <div className={s.divApp}>
        <img className={s.logo} src={logo} alt="" />
        <p>¡Descargá nuestra app!</p>
      </div>
      <div className={s.divNav}>
        <Link className={s.link} to="/">Inicio</Link>
        <Link className={s.link} to="/tienda">Tienda</Link>
        <Link className={s.link} to="/fabricantes">Fabricantes</Link>
        <Link className={s.link} to="/preguntas-frecuentes">Ayuda</Link>
        <Link className={s.link} to="/mi-carrito">Carrito</Link>
      </div>
    </div>
  )
}


export default Footer;
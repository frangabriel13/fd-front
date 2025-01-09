import { Link } from "react-router-dom";
import s from "./Navbar.module.css";
import { BsChevronDown } from "react-icons/bs";

const Navbar = () => {
  return (
    <div className={s.container}>
      <Link to="/" className={s.link}>
        Categorías <BsChevronDown className={s.icon} />
      </Link>
      <Link to="/productos" className={s.link}>Tienda</Link>
      <Link to="/contacto" className={s.link}>Fabricantes</Link>
      <Link to="/nosotros" className={s.link}>Cómo Comprar</Link>
    </div>
  )
};


export default Navbar;
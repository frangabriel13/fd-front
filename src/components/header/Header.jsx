import s from './Header.module.css';
import logo from '../../assets/logo.jpg';
import SearchBar from '../searchBar/SearchBar';
import Navbar from '../navbar/Navbar';
import { Link } from 'react-router-dom';
import { BsCart2 } from "react-icons/bs";

const Header = () => {
  return (
    <div className={s.container}>
      <div className={s.divLogo}>
        <img src={logo} alt="Logo" className={s.logo} />
      </div>
      <div className={s.search}>
        <SearchBar />
      </div>
      <div className={s.message}>Ofertas Exclusivas por tiempo limitado</div>
      <div className={s.placeholder}>
      </div>
      <div className={s.navbar}>
        <Navbar />
      </div>
      <div className={s.login}>
        <Link to="/ingresar" className={s.link}>Ingresar</Link>
        <Link className={s.link}>Registrarse</Link>
        <BsCart2 className={s.link} />
      </div>
    </div>
  );
};


export default Header;
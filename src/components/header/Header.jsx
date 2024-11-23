import s from './Header.module.css';
import logo from '../../assets/logo.jpg';
import SearchBar from '../searchBar/SearchBar';

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
      <div className={s.placeholder}>Placeholder</div>
      <div className={s.navbar}>Navbar</div>
      <div className={s.login}>Ingresa</div>
    </div>
  );
};


export default Header;
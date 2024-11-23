import s from './Header.module.css';
import logo from '../../assets/logo.jpg';
import SearchBar from '../searchBar/SearchBar';

const Header = () => {
  return (
    <div className={s.container}>
      <div className={s.topHeader}>
        <img src={logo} alt="Logo" className={s.logo} />
        <SearchBar />
      </div>
    </div>
  )
};


export default Header;
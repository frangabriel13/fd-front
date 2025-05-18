import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsCart2, BsList } from "react-icons/bs";
import s from './HeaderMobile.module.css';
import logo from '../../assets/logo.jpg';
import SearchBar from '../searchBar/SearchBar';
import NavbarMobile from '../navbar/NavbarMobile';
import { useSelector } from 'react-redux';

const HeaderMobile = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const cartItemsCount = useSelector((state) => state.cart.items.length);

  const handleMenuClick = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div className={s.container}>
      <div className={s.containerMobile}>
        <div className={s.divLogo}>
          <Link to="/" className={s.logoMobile}>
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <div className={s.search}>
          <SearchBar />
        </div>
        <div className={s.iconsMobile}>
          <button className={s.menuBtnMobile} onClick={handleMenuClick}>
            <BsList size={28} />
          </button>
          <Link to="/mi-carrito" className={s.cartMobile}>
            <BsCart2 size={28} />
            {cartItemsCount > 0 && <span className={s.cartBadgeMobile}>{cartItemsCount}</span>}
          </Link>
        </div>
      </div>
      {menuOpen && (
        <NavbarMobile open={menuOpen} onClose={() => setMenuOpen(false)} />
      )}
    </div>
  );
};

export default HeaderMobile;
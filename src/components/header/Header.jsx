import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import s from './Header.module.css';
import logo from '../../assets/logo.jpg';
import SearchBar from '../searchBar/SearchBar';
import Navbar from '../navbar/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { BsCart2 } from "react-icons/bs";
import { logout } from '../../store/actions/authActions';
import { getFavorites } from '../../store/actions/favoriteActions';
import { use } from 'react';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const cartItemsCount = useSelector((state) => state.cart.items.length);
  const { favorites } = useSelector((state) => state.favorite);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getFavorites());
    }
  }, [dispatch, isAuthenticated]);

  const handleLogout = () => {
    dispatch(logout());
    setTimeout(() => {
      navigate('/ingresar');
    }, 1000);
  };

  return (
    <div className={s.container}>
      <div className={s.divLogo}>
        <Link to="/">
          <img src={logo} alt="Logo" className={s.logo} />
        </Link>
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
        {isAuthenticated ? (
          <>
            <Link to="/mi-cuenta" className={s.link}>Mi cuenta</Link>
            {/* <button className={s.btnNav}>Mi cuenta</button> */}
            <button onClick={handleLogout} className={s.btnNav}>Salir</button>
          </>
        ) : (
          <>
            <Link to="/ingresar" className={s.link}>Ingresar</Link>
            <Link to="/registro" className={s.link}>Registrarse</Link>
          </>
        )}
        <Link to="/mi-carrito" className={s.link}>
          <div className={s.divCartIcon}>
            <BsCart2 className={s.cartIcon} />
            {cartItemsCount > 0 && <span className={s.cartBadge}>{cartItemsCount}</span>}
          </div>
        </Link>
      </div>
    </div>
  );
};


export default Header;
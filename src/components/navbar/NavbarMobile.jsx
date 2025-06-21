import { useState, useEffect } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getCategories } from '../../store/actions/categoryActions';
import { logout } from '../../store/actions/authActions';
import s from './NavbarMobile.module.css';

const NavbarMobile = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const categories = useSelector((state) => state.category.categories);
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  if(!open) return null;

  return (
    <div className={s.overlay} onClick={onClose}>
      <div className={s.menu} onClick={e => e.stopPropagation()}>
        <button className={s.closeBtn} onClick={onClose}>Cerrar</button>
        {/* Link mi cuenta */}
        {isAuthenticated ? (
          <Link to="/mi-cuenta" className={s.link} onClick={onClose}>Mi Cuenta</Link>
        ) : (
          <>
            <Link to="/ingresar" className={s.link} onClick={onClose}>Ingresar</Link>
            <Link to="/registro" className={s.link} onClick={onClose}>Registrarse</Link>
          </>
        )}
        {/* <button className={s.link} onClick={() => setShowCategories(v => !v)}>
          Categorías
        </button> */}
        {showCategories && (
          <div className={s.categoriesList}>
            {categories
              .filter(cat =>
                ["Indumentaria", "Blanquería", "Bisutería"].includes(cat.name)
              )
              .map(cat => (
                <Link
                  key={cat.id}
                  to={`/tienda?type=product&category=${cat.id}&subcategory=&gender=&sortBy=&searchTerm=`}
                  className={s.link}
                  onClick={onClose}
                >
                  {cat.name}
                </Link>
              ))}
          </div>
        )}
        <Link to="/tienda" className={s.link} onClick={onClose}>Tienda</Link>
        <Link to="/fabricantes" className={s.link} onClick={onClose}>Fabricantes</Link>
        <Link to="/preguntas-frecuentes" className={s.link} onClick={onClose}>Ayuda</Link>
        {isAuthenticated && (
          <button
            className={s.link}
            onClick={() => {
              dispatch(logout());
              onClose();
              setTimeout(() => {
                navigate('/ingresar');
              }, 1000);
            }}
          >
            Cerrar sesión
          </button>
        )}
      </div>
    </div>
  );
};


export default NavbarMobile;
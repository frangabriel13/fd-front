import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import s from './NavbarMobile.module.css';

const NavbarMobile = ({ open, onClose }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const categories = useSelector((state) => state.category.categories);
  const [showCategories, setShowCategories] = useState(false);

  if(!open) return null;

  return (
    <div className={s.overlay} onClick={onClose}>
      <div className={s.menu} onClick={e => e.stopPropagation()}>
        <button className={s.closeBtn} onClick={onClose}>Cerrar</button>
        {!isAuthenticated && (
          <>
            <Link to="/ingresar" className={s.link} onClick={onClose}>Ingresar</Link>
            <Link to="/registrarse" className={s.link} onClick={onClose}>Registrarse</Link>
          </>
        )}
        <button className={s.link} onClick={() => setShowCategories(v => !v)}>
          Categorías
        </button>
        {showCategories && (
          <div className={s.categoriesList}>
            {categories.map(cat => (
              <Link
                key={cat.id}
                to={`/categoria/${cat.slug}`}
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
      </div>
    </div>
  );
};


export default NavbarMobile;
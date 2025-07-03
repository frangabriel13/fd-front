import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Pequeño delay para asegurar que el DOM se haya actualizado
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
      // Alternativa para asegurar compatibilidad
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Ejecutar inmediatamente
    scrollToTop();
    
    // También ejecutar con un pequeño delay por si acaso
    setTimeout(scrollToTop, 100);
  }, [pathname]);

  return null;
};

export default ScrollToTop;

import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getBisuteriaOrBlanqueria } from '../../store/actions/productActions';
import s from './ProductRow.module.css';
import { GrNext, GrPrevious } from "react-icons/gr";
import ProductCard from '../productStore/ProductCard';

const BisBlanProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bisBlanProducts, loading, error } = useSelector((state) => state.product);
  const productsContainerRef = useRef(null);

  useEffect(() => {
    dispatch(getBisuteriaOrBlanqueria());
  }, [dispatch]);

  const handleViewMore = () => {
    navigate('/tienda/mas');
  };

  const handleNext = () => {
    if (productsContainerRef.current) {
      productsContainerRef.current.scrollLeft += productsContainerRef.current.offsetWidth;
    }
  };

  const handlePrev = () => {
    if (productsContainerRef.current) {
      productsContainerRef.current.scrollLeft -= productsContainerRef.current.offsetWidth;
    }
  };

  if(loading) {
    return <div className={s.loading}>Cargando productos...</div>;
  }

  if(error) {
    return <div className={s.error}>Error al cargar los productos: {error}</div>;
  }

  if(!bisBlanProducts || bisBlanProducts.length === 0) {
    return <div className={s.noProducts}>No hay productos disponibles.</div>;
  }
  
  return (
    <div className={s.container}>
      <div className={s.divTitle}>
        <h2 className={s.title}>Bisutería/Blanquería</h2>
        <button className={s.btnMore} onClick={handleViewMore}>Ver más</button>
      </div>
      <div className={s.navigation}>
        <button className={s.prevButton} onClick={handlePrev}>
          <GrPrevious />
        </button>
        <div className={s.divProducts} ref={productsContainerRef}>
          {bisBlanProducts && bisBlanProducts.map((product, index) => (
            <div className={s.productCard} key={`${product.id}-${index}`}>
                <ProductCard 
                  name={product.name}
                  image={product.mainImage}
                  price={product.price}
                  logo={product.logo}
                  id={product.id}
                />
              </div>
          ))}
        </div>
        <button className={s.nextButton} onClick={handleNext}>
          <GrNext />
        </button>
      </div>
    </div>
  );
};


export default BisBlanProducts;
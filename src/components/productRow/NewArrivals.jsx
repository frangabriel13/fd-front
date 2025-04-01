import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getNewProducts } from '../../store/actions/productActions';
import s from './ProductRow.module.css';
import { GrNext, GrPrevious } from "react-icons/gr";
import ProductCard from '../productStore/ProductCard';

const NewArrivals = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { newProducts, loading, error } = useSelector((state) => state.product);
  const productsContainerRef = useRef(null);

  useEffect(() => {
    dispatch(getNewProducts());
  }, [dispatch]);

  const handleViewMore = () => {
    navigate('/tienda?type=product&sortBy=newest');
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
  
  return (
    <div className={s.container}>
      <div className={s.divTitle}>
        <h2 className={s.title}>Nuevos ingresos</h2>
        <button className={s.btnMore} onClick={handleViewMore}>Ver más</button>
      </div>
      <div className={s.navigation}>
        <button className={s.prevButton} onClick={handlePrev}>
          <GrPrevious />
        </button>
        <div className={s.divProducts} ref={productsContainerRef}>
          {newProducts.map((product, index) => (
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


export default NewArrivals;
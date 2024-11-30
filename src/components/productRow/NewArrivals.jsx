import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../store/actions/productActions';
import s from './ProductRow.module.css';
import { GrNext, GrPrevious } from "react-icons/gr";
import ProductCard from '../productCard/ProductCard';

const NewArrivals = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  console.log(products);
  
  return (
    <div className={s.container}>
      <div className={s.divTitle}>
        <h2 className={s.title}>Nuevos ingresos</h2>
        <button className={s.btnMore}>Ver más</button>
      </div>
      <div className={s.navigation}>
        <button className={s.prevButton}>
          <GrPrevious />
        </button>
        <div className={s.divProducts}>
          {products.map((product, index) => (
            <ProductCard key={`${product.id}-${index}`} product={product} />
          ))}
        </div>
        <button className={s.nextButton}>
          <GrNext />
        </button>
      </div>
    </div>
  );
};


export default NewArrivals;
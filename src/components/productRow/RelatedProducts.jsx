import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getRelatedProducts } from '../../store/actions/productActions';
import s from './ProductRow.module.css';
import ProductCard from '../productStore/ProductCard';

const RelatedProducts = ({ categoryId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { relatedProducts, loadingRelatedProducts, errorRelatedProducts } = useSelector((state) => state.product);
  const productsContainerRef = useRef(null);

  useEffect(() => {
    if(categoryId) {
      dispatch(getRelatedProducts(categoryId));
    }
  }, [dispatch, categoryId]);

  const handleViewMore = () => {
    navigate(`/products/category/${categoryId}`);
  }

  if (loadingRelatedProducts) {
    return <div className={s.loading}>Cargando productos relacionados...</div>;
  }

  if (errorRelatedProducts) {
    return <div className={s.error}>Error al cargar los productos: {errorRelatedProducts}</div>;
  }

  if (!relatedProducts || relatedProducts.length === 0) {
    return <div className={s.noProducts}>No hay productos relacionados disponibles.</div>;
  }

  console.log('Related Products:', relatedProducts);

  return (
    <div className={s.container}>
      <div className={s.divTitle}>
        <h2 className={s.title}>Relacionados</h2>
        <button className={s.btnMore} onClick={handleViewMore}>Ver más</button>
      </div>
      <div className={s.divNavigation}>
        <div className={s.divProducts} ref={productsContainerRef}>
          {relatedProducts.map(product => (
            <ProductCard 
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.mainImage}
              price={product.price}
              logo={product.logo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};


export default RelatedProducts;
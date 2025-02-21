import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../store/actions/productActions';
import s from './Shop.module.css';
import ProductCard from '../../components/productStore/ProductCard';

const Shop = () => {
  const dispatch = useDispatch();
  // pageSize no es un estado global
  const { products, currentPage, totalProducts } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(getProducts(currentPage));
  }, [dispatch, currentPage]);

  return (
    <div className={s.container}>
      <div className={s.divHeader}>
        <h2 className={s.title}>Tienda</h2>
      </div>
      <div className={s.divProducts}>
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            name={product.name}
            image={product.mainImage}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};


export default Shop;
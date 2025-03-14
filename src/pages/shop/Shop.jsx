import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../store/actions/productActions';
import s from './Shop.module.css';
import ProductCard from '../../components/productStore/ProductCard';
import FiltersShop from './FiltersShop';

const Shop = () => {
  const dispatch = useDispatch();
  const { products, currentPage, totalProducts } = useSelector(state => state.product);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: '',
    category: '',
    subcategory: '',
    gender: '',
    sortBy: '',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      await dispatch(getProducts(currentPage, filters));
      setLoading(false);
    };

    fetchProducts();
  }, [dispatch, currentPage, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  return (
    <div className={s.container}>
      <div className={s.divHeader}>
        <h2 className={s.title}>Tienda</h2>
      </div>
      <FiltersShop onFilterChange={handleFilterChange} />
      <div className={s.divProducts}>
        {loading ? (
          <p>Cargando productos...</p>
        ) : (
          products.map(product => (
            <ProductCard 
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.mainImage}
              price={product.price}
              logo={product.logo}
            />
          ))
        )}
      </div>
    </div>
  );
};


export default Shop;
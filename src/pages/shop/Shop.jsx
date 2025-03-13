import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../store/actions/productActions';
import s from './Shop.module.css';
import ProductCard from '../../components/productStore/ProductCard';

const Shop = () => {
  const dispatch = useDispatch();
  const { products, currentPage, totalProducts } = useSelector(state => state.product);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      await dispatch(getProducts(currentPage));
      setLoading(false);
    };

    fetchProducts();
  }, [dispatch, currentPage]);

  return (
    <div className={s.container}>
      <div className={s.divHeader}>
        <h2 className={s.title}>Tienda</h2>
      </div>
      <div className={s.divFilters}>
        <div>
          <label>Tipo:</label>
          <select>
            <option>Productos</option>
            <option>Packs</option>
          </select>
        </div>
        <div>
          <label>Sexo:</label>
          <select>
            <option>Todos</option>
            <option>Hombre</option>
            <option>Mujer</option>
          </select>
        </div>
        <div>
          <label>Categoría</label>
          <button>
            Ver categorías
          </button>
        </div>
        <div>
          <label>Ordenar por:</label>
          <select>
            <option>Más nuevos</option>
            <option>Menor precio</option>
            <option>Mayor precio</option>
          </select>
        </div>
      </div>
      <div className={s.divProducts}>
        {loading ? (
          <p>Cargando productos...</p>
        ) : (
          products.map(product => (
            <ProductCard 
              key={product.id} 
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
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../productStore/ProductCard';
import Pagination from '../pagination/Pagination';
import s from './Catalog.module.css';
import { getProducts } from '../../store/actions/productActions';
import { GrLinkPrevious } from "react-icons/gr";

const Catalog = ({ genderId, categoryId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error, currentPage, totalProducts } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(getProducts(currentPage, 24, genderId, categoryId));
  }, [dispatch, genderId, categoryId, currentPage]);

  const handleBack = () => {
    navigate('/tienda');
  };

  const handlePageChange = (page) => {
    dispatch(getProducts(page, 24, genderId, categoryId));
  };

  return (
    <div className={s.container}>
      <div className={s.header}>
        <button
          className={`${s.button} ${s.backBtn}`}
          onClick={handleBack}
        >
          <GrLinkPrevious className={s.iconBack} />
          Volver
        </button>
      </div>
      <div className={s.productList}>
        {loading ? (
          <p>Cargando productos...</p>
        ) : error ? (
          <p>Error al cargar productos: {error}</p>
        ) : products.length === 0 ? (
          <p>No hay productos disponibles.</p>
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
      <Pagination 
        totalProducts={totalProducts} 
        pageSize={24} 
        currentPage={currentPage} 
        onPageChange={handlePageChange}
      />
    </div>
  );
};


export default Catalog;
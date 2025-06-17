import { useEffect, useState } from 'react';
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
  const [sortBy, setSortBy] = useState('notOrdered');

  useEffect(() => {
    dispatch(getProducts(currentPage, 24, genderId, categoryId, sortBy));
  }, [dispatch, genderId, categoryId, currentPage, sortBy]);

  const handleBack = () => {
    navigate('/tienda');
  };

  const handlePageChange = (page) => {
    dispatch(getProducts(page, 24, genderId, categoryId));
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
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
      <div className={s.divProducts}>
        <div className={s.divSelect}>
          <select className={s.select} value={sortBy} onChange={handleSortChange}>
            <option value="notOrdered">Sin orden</option>
            <option value="newest">Más Nuevos</option>
            <option value="lowestPrice">Menor precio</option>
            <option value="highestPrice">Mayor precio</option>
          </select>
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
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/productStore/ProductCard';
import Pagination from '../../components/pagination/Pagination';
import { advancedSearchProducts } from '../../store/actions/productActions';
import s from './Search.module.css';
import { GrLinkPrevious } from "react-icons/gr";

const Search = () => {
  const dispatch = useDispatch();
  const { query } = useParams();
  const { 
    advancedSearchProducts: products = [], 
    loading, 
    error, 
    advancedSearchCurrentPage: currentPage, 
    totalAdvancedSearchProducts: totalProducts
  } = useSelector(state => state.product);
  
  const [sortBy, setSortBy] = useState('notOrdered');

  useEffect(() => {
    if(query) {
      dispatch(advancedSearchProducts(1, 20, query, sortBy));
    }
  }, [dispatch, query, sortBy]);

  const handlePageChange = (page) => {
    dispatch(advancedSearchProducts(page, 20, query, sortBy));
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleBack = () => {
    window.history.back();
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
        {query && (
          <p className={s.searchInfo}>
            Mostrando resultados para: <strong>&ldquo;{query}&rdquo;</strong>
            {totalProducts > 0 && (
              <span> ({totalProducts} productos encontrados)</span>
            )}
          </p>
        )}
      </div>

      {query ? (
        <div className={s.searchContainer}>
          <div className={s.controls}>
            <select 
              className={s.sortSelect} 
              value={sortBy} 
              onChange={handleSortChange}
            >
              <option value="notOrdered">Sin orden</option>
              <option value="newest">Más nuevos</option>
              <option value="lowestPrice">Menor precio</option>
              <option value="highestPrice">Mayor precio</option>
            </select>
          </div>

          <div className={s.results}>
            {loading ? (
              <div className={s.loading}>
                <p>Buscando productos...</p>
              </div>
            ) : error ? (
              <div className={s.error}>
                <p>Error al buscar productos: {error}</p>
              </div>
            ) : products.length === 0 ? (
              <div className={s.noResults}>
                <p>No se encontraron productos para &ldquo;{query}&rdquo;</p>
                <p>Intenta con otros términos de búsqueda.</p>
              </div>
            ) : (
              <div className={s.productGrid}>
                {products.map(product => (
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
            )}
          </div>

          {products.length > 0 && totalProducts > 20 && (
            <Pagination 
              totalProducts={totalProducts} 
              pageSize={20} 
              currentPage={currentPage} 
              onPageChange={handlePageChange}
            />
          )}
        </div>
      ) : (
        <div className={s.noQuery}>
          <p className={s.description}>
            Utiliza la barra de búsqueda para encontrar productos, marcas o categorías.
          </p>
        </div>
      )}
    </div>
  );
};


export default Search;
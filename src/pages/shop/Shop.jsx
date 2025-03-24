import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getProducts } from '../../store/actions/productActions';
import { getPacks } from '../../store/actions/packActions';
import { getGenders } from '../../store/actions/genderActions';
import s from './Shop.module.css';
import ProductCard from '../../components/productStore/ProductCard';
import FiltersShop from './FiltersShop';
import Pagination from '../../components/pagination/Pagination';

const Shop = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { products, currentPage, totalProducts } = useSelector(state => state.product);
  const { packs } = useSelector(state => state.pack);
  const { genders } = useSelector(state => state.gender);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: 'product',
    category: '',
    subcategory: '',
    gender: '',
    sortBy: 'newest',
  });

  const parseQueryParams = (search) => {
    const params = new URLSearchParams(search);
    return {
      type: params.get('type') || 'product',
      category: params.get('category') || '',
      subcategory: params.get('subcategory') || '',
      gender: params.get('gender') || '',
      sortBy: params.get('sortBy') || '',
      searchTerm: params.get('searchTerm') || '',
    };
  };

  // useEffect(() => {
  //   const queryFilters = parseQueryParams(location.search);
  //   setFilters((prevFilters) => ({
  //     ...prevFilters,
  //     ...queryFilters,
  //   }));
  // }, [location.search]);
  
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     if (!filters.searchTerm && location.search.includes('searchTerm')) {
  //       return; // Evitar llamada innecesaria si los filtros aún no están sincronizados
  //     }
      
  //     setLoading(true);
  //     if (filters.type === 'product') {
  //       await dispatch(getProducts(currentPage, 24, filters, filters.searchTerm));
  //     } else if (filters.type === 'pack') {
  //       await dispatch(getPacks(currentPage, 24));
  //     }
  //     setLoading(false);
  //   };
    
  //   fetchProducts();
  // }, [dispatch, currentPage, filters, location.search]);
  useEffect(() => {
    const queryFilters = parseQueryParams(location.search);
    setFilters(queryFilters);
  }, [location.search]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      if (filters.type === 'product') {
        await dispatch(getProducts(currentPage, 24, filters, filters.searchTerm));
      } else if (filters.type === 'pack') {
        await dispatch(getPacks(currentPage, 24));
      }
      setLoading(false);
    };

    fetchProducts();
  }, [dispatch, currentPage, filters]);

  useEffect(() => {
    dispatch(getGenders());
  }, [dispatch]);

  const handleFilterChange = (newFilters) => {
    const updatedFilters = {
      ...filters,
      ...newFilters,
    };
    setFilters(updatedFilters);

    // Actualizar la URL con los nuevos filtros
    const queryParams = new URLSearchParams(updatedFilters);
    navigate(`?${queryParams.toString()}`);
  };

  const handlePageChange = (page) => {
    dispatch(getProducts(page, 24, filters));
  };

  return (
    <div className={s.container}>
      <div className={s.divHeader}>
        <h2 className={s.title}>Tienda</h2>
      </div>
      <FiltersShop 
        onFilterChange={handleFilterChange} 
        genders={genders}
        filters={filters}
      />
      <div className={s.divProducts}>
        {loading ? (
          <p>Cargando productos...</p>
        ) : (
          filters.type === 'product' ? (
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
          ) : (
            packs.map(pack => (
              <ProductCard 
                key={pack.id}
                id={pack.id}
                name={pack.name}
                image={pack.mainImage}
                price={pack.price}
                logo={pack.logo}
              />
            ))
          )
        )}
      </div>
      <Pagination 
        currentPage={currentPage} 
        totalProducts={totalProducts}
        pageSize={24}
        onPageChange={handlePageChange}
      />
    </div>
  );
};


export default Shop;
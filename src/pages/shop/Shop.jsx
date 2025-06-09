// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import s from './Shop.module.css';
// import Shopping from '../../components/shopComponents/Shopping';
// import CategorySelection from '../../components/shopComponents/CategorySelection';
// import ModalCategory from '../../components/shopComponents/ModalCategory';
// import { 
//   parentCategories,
//   indumentariaCategories,
//   blanqueriaCategories,
//   bisuteriaCategories
// } from '../../utils/hardcodeo';

// const DEFAULT_CATEGORY = 'indumentaria';
// const DEFAULT_GENDER = 3;

// const Shop = () => {
//   const { category, gender, subcategory } = useParams();
//   const navigate = useNavigate();
//   const genderFromUrl = gender ? Number(gender) : DEFAULT_GENDER;
//   const [showModal, setShowModal] = useState(false);
//   const [selectedSubcategory, setSelectedSubcategory] = useState(null);
//   const [selectedGenderId, setSelectedGenderId] = useState(genderFromUrl);

//   // Busca la categoría por slug (nombre en minúsculas)
//   const selectedCategory = parentCategories.find(
//     cat => cat.name.toLowerCase() === (category || DEFAULT_CATEGORY).toLowerCase()
//   ) || parentCategories[0];

//   // Determina las subcategorías según la categoría principal seleccionada
//   let subcategories = [];
//   if (selectedCategory.name.toLowerCase() === 'indumentaria') {
//     subcategories = indumentariaCategories;
//   } else if (selectedCategory.name.toLowerCase() === 'blanquería') {
//     subcategories = blanqueriaCategories;
//   } else if (selectedCategory.name.toLowerCase() === 'bisutería') {
//     subcategories = bisuteriaCategories;
//   }

//   // Sincroniza el estado de subcategoría con la URL
//   useEffect(() => {
//     if (subcategory && subcategories.length > 0) {
//       let found = null;
//       if (selectedCategory.name.toLowerCase() === 'indumentaria') {
//         const genderObj = subcategories.find(cat => cat.gender.id === selectedGenderId);
//         if (genderObj) {
//           found = genderObj.categories.find(cat => String(cat.id) === String(subcategory));
//         }
//       } else if (subcategories[0]?.categories) {
//         found = subcategories[0].categories.find(cat => String(cat.id) === String(subcategory));
//       }
//       setSelectedSubcategory(found || null);
//     } else {
//       setSelectedSubcategory(null);
//     }
//   }, [subcategory, subcategories, selectedCategory.name, selectedGenderId]);

//   // Cuando cambia el parámetro de género en la URL, actualiza el estado
//   useEffect(() => {
//     if (gender && Number(gender) !== selectedGenderId) {
//       setSelectedGenderId(Number(gender));
//     }
//   }, [gender, selectedGenderId]);
  
//   // Redirige a /tienda/indumentaria/:gender si no hay categoría o género en la URL
//   useEffect(() => {
//     if (!category) {
//       navigate(`/tienda/${DEFAULT_CATEGORY}/${selectedGenderId}`, { replace: true });
//     } else if (selectedCategory.name.toLowerCase() === 'indumentaria' && !gender) {
//       navigate(`/tienda/${category}/${selectedGenderId}`, { replace: true });
//     }
//   }, [category, gender, navigate, selectedGenderId, selectedCategory.name]);

//   // Cambia la categoría y actualiza la URL
//   const handleCategoryChange = (newCategoryId) => {
//     const cat = parentCategories.find(cat => cat.id === newCategoryId);
//     if (cat) {
//       if (cat.name.toLowerCase() === 'indumentaria') {
//         navigate(`/tienda/${cat.name.toLowerCase()}/${selectedGenderId}`);
//       } else {
//         navigate(`/tienda/${cat.name.toLowerCase()}`);
//       }
//       setShowModal(false);
//     }
//   };

//   // Cuando cambia el género, actualiza la URL
//   const handleGenderChange = (newGenderId) => {
//     setSelectedGenderId(newGenderId);
//     navigate(`/tienda/${selectedCategory.name.toLowerCase()}/${newGenderId}`);
//     setSelectedSubcategory(null);
//   };

//   // Cuando el usuario selecciona una subcategoría, navega a la URL correspondiente
//   const handleSubcategorySelect = (cat) => {
//     setSelectedSubcategory(cat);
//     if (selectedCategory.name.toLowerCase() === 'indumentaria') {
//       navigate(`/tienda/${selectedCategory.name.toLowerCase()}/${selectedGenderId}/${cat.id}`);
//     } else {
//       navigate(`/tienda/${selectedCategory.name.toLowerCase()}/${cat.id}`);
//     }
//   };

//   return (
//     <div className={s.container}>
//       <div className={s.divHeader}>
//         <h2 className={s.title}>
//           {selectedCategory ? selectedCategory.name : ''}
//         </h2>
//         <button className={s.btnChange} onClick={() => setShowModal(true)}>
//           Cambiar
//         </button>
//       </div>
//       {!selectedSubcategory ? (
//         <CategorySelection
//           categories={subcategories}
//           onSelect={handleSubcategorySelect}
//           isIndumentaria={selectedCategory.name.toLowerCase() === 'indumentaria'}
//           selectedGenderId={selectedGenderId}
//           onGenderChange={handleGenderChange}
//         />
//       ) : (
//         <Shopping subcategory={selectedSubcategory} />
//       )}
//       {showModal && (
//         <ModalCategory
//           categories={parentCategories}
//           selected={selectedCategory.id}
//           onSelect={handleCategoryChange}
//           onClose={() => setShowModal(false)}
//         />
//       )}
//     </div>
//   );
// };


// export default Shop;


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
import PackCard from '../../components/packStore/PackCard';
import useWindowWidth from '../../hooks/useWindowWidth';

// Arreglar el hecho que llame dos veces a la API para obtener los productos y packs.
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
  const [showFilters, setShowFilters] = useState(false);

  const width = useWindowWidth();
  const isMobile = width <= 480;

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
        await dispatch(getPacks(currentPage, 24, filters));
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
        {isMobile && (
          <button
            className={s.filterToggleBtn}
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? 'Cerrar filtros' : 'Filtrar'}
          </button>
        )}
      </div>
      {(!isMobile || showFilters) && (
          <FiltersShop 
            onFilterChange={handleFilterChange} 
            genders={genders}
            filters={filters}
          />
      )}
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
            packs.map((pack, index) => (
              <div className={s.productCard} key={`${pack.id}-${index}`}>
                <PackCard 
                  name={pack.name}
                  price={pack.price}
                  logo={pack.logo}
                  id={pack.id}
                  products={pack.products}
                />
              </div>
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
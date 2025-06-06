import { useState } from 'react';
import s from './Shop.module.css';
import Stepper from '../../components/shopComponents/Stepper';
import CategorySelection from '../../components/shopComponents/CategorySelection';
import CategoriesSelection from '../../components/shopComponents/CategoriesSelection';
import GenderSelection from '../../components/shopComponents/GenderSelection';
import Shopping from '../../components/shopComponents/Shopping';

const steps = [
  'Selecciona una categoría',
  'Selecciona un genero',
  'Selecciona una subcategoría',
  'Tienda',
];

const Shop = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  // Paso 1: Elegir categoría
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    if (category === 'Indumentaria') {
      setActiveStep(1);
    } else {
      setActiveStep(3); // Ir directo a Shopping
    }
  };

  // Paso 2: Elegir género
  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    setActiveStep(2);
  };

  // Paso 3: Elegir subcategoría
  const handleSubcategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setActiveStep(3);
  };

  // Volver atrás
  const handleBack = () => {
    if (activeStep === 3 && selectedCategory !== 'Indumentaria') {
      setSelectedCategory(null);
      setActiveStep(0);
    } else if (activeStep === 3) {
      setSelectedSubcategory(null);
      setActiveStep(2);
    } else if (activeStep === 2) {
      setSelectedGender(null);
      setActiveStep(1);
    } else if (activeStep === 1) {
      setSelectedCategory(null);
      setActiveStep(0);
    }
  };

  return (
    <div className={s.container}>
      <div className={s.divHeader}>
        <h2 className={s.title}>Tienda</h2>
      </div>
      <div className={s.stepperContainer}>
        <Stepper steps={steps} activeStep={activeStep} />
        {activeStep === 0 && (
          <CategorySelection onSelect={handleCategorySelect} />
        )}
        {activeStep === 1 && selectedCategory === 'Indumentaria' && (
          <GenderSelection onSelect={handleGenderSelect} onBack={handleBack} />
        )}
        {activeStep === 2 && (
          <CategoriesSelection
            gender={selectedGender}
            onSelect={handleSubcategorySelect}
            onBack={handleBack}
          />
        )}
        {activeStep === 3 && (
          <Shopping
            category={selectedCategory}
            gender={selectedGender}
            subcategory={selectedSubcategory}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  )
};


export default Shop;

// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { getProducts } from '../../store/actions/productActions';
// import { getPacks } from '../../store/actions/packActions';
// import { getGenders } from '../../store/actions/genderActions';
// import s from './Shop.module.css';
// import ProductCard from '../../components/productStore/ProductCard';
// import FiltersShop from './FiltersShop';
// import Pagination from '../../components/pagination/Pagination';
// import PackCard from '../../components/packStore/PackCard';
// import useWindowWidth from '../../hooks/useWindowWidth';

// // Arreglar el hecho que llame dos veces a la API para obtener los productos y packs.
// const Shop = () => {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { products, currentPage, totalProducts } = useSelector(state => state.product);
//   const { packs } = useSelector(state => state.pack);
//   const { genders } = useSelector(state => state.gender);
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({
//     type: 'product',
//     category: '',
//     subcategory: '',
//     gender: '',
//     sortBy: 'newest',
//   });
//   const [showFilters, setShowFilters] = useState(false);

//   const width = useWindowWidth();
//   const isMobile = width <= 480;

//   const parseQueryParams = (search) => {
//     const params = new URLSearchParams(search);
//     return {
//       type: params.get('type') || 'product',
//       category: params.get('category') || '',
//       subcategory: params.get('subcategory') || '',
//       gender: params.get('gender') || '',
//       sortBy: params.get('sortBy') || '',
//       searchTerm: params.get('searchTerm') || '',
//     };
//   };

//   useEffect(() => {
//     const queryFilters = parseQueryParams(location.search);
//     setFilters(queryFilters);
//   }, [location.search]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       if (filters.type === 'product') {
//         await dispatch(getProducts(currentPage, 24, filters, filters.searchTerm));
//       } else if (filters.type === 'pack') {
//         await dispatch(getPacks(currentPage, 24, filters));
//       }
//       setLoading(false);
//     };

//     fetchProducts();
//   }, [dispatch, currentPage, filters]);

//   useEffect(() => {
//     dispatch(getGenders());
//   }, [dispatch]);

//   const handleFilterChange = (newFilters) => {
//     const updatedFilters = {
//       ...filters,
//       ...newFilters,
//     };
//     setFilters(updatedFilters);

//     // Actualizar la URL con los nuevos filtros
//     const queryParams = new URLSearchParams(updatedFilters);
//     navigate(`?${queryParams.toString()}`);
//   };

//   const handlePageChange = (page) => {
//     dispatch(getProducts(page, 24, filters));
//   };

//   return (
//     <div className={s.container}>
//       <div className={s.divHeader}>
//         <h2 className={s.title}>Tienda</h2>
//         {isMobile && (
//           <button
//             className={s.filterToggleBtn}
//             onClick={() => setShowFilters(!showFilters)}
//           >
//             {showFilters ? 'Cerrar filtros' : 'Filtrar'}
//           </button>
//         )}
//       </div>
//       {(!isMobile || showFilters) && (
//           <FiltersShop 
//             onFilterChange={handleFilterChange} 
//             genders={genders}
//             filters={filters}
//           />
//       )}
//       <div className={s.divProducts}>
//         {loading ? (
//           <p>Cargando productos...</p>
//         ) : (
//           filters.type === 'product' ? (
//             products.map(product => (
//               <ProductCard 
//                 key={product.id}
//                 id={product.id}
//                 name={product.name}
//                 image={product.mainImage}
//                 price={product.price}
//                 logo={product.logo}
//               />
//             ))
//           ) : (
//             packs.map((pack, index) => (
//               <div className={s.productCard} key={`${pack.id}-${index}`}>
//                 <PackCard 
//                   name={pack.name}
//                   price={pack.price}
//                   logo={pack.logo}
//                   id={pack.id}
//                   products={pack.products}
//                 />
//               </div>
//             ))
//           )
//         )}
//       </div>
//       <Pagination 
//         currentPage={currentPage} 
//         totalProducts={totalProducts}
//         pageSize={24}
//         onPageChange={handlePageChange}
//       />
//     </div>
//   );
// };


// export default Shop;
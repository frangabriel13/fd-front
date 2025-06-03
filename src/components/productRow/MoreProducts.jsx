import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getFiveProductsByManufacturer } from '../../store/actions/productActions';
import s from './ProductRow.module.css';
import { GrNext, GrPrevious } from "react-icons/gr";
import ProductCard from '../productStore/ProductCard';

const MoreProducts = ({ userId, manufacturerName, manufacturerId, manufacturerLogo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { otherProducts, loadingOtherProducts, errorOtherProducts } = useSelector((state) => state.product);
  const productsContainerRef = useRef(null);

  useEffect(() => {
    if (userId) {
      dispatch(getFiveProductsByManufacturer(userId, 'newest'));
    }
  }, [dispatch, userId]);

  const handleViewMore = () => {
    navigate(`/store/${userId}`);
  };

  console.log('manufacturerLogo', manufacturerLogo);

  // const handleNext = () => {
  //   if (productsContainerRef.current) {
  //     productsContainerRef.current.scrollLeft += productsContainerRef.current.offsetWidth;
  //   }
  // };

  // const handlePrev = () => {
  //   if (productsContainerRef.current) {
  //     productsContainerRef.current.scrollLeft -= productsContainerRef.current.offsetWidth;
  //   }
  // };

  if(loadingOtherProducts) {
    return <div className={s.loading}>Cargando nuevos productos...</div>;
  }

  if(errorOtherProducts) {
    return <div className={s.error}>Error al cargar los productos: {errorOtherProducts}</div>;
  }

  if(!otherProducts || otherProducts.length === 0) {
    return <div className={s.noProducts}>No hay nuevos productos disponibles.</div>;
  }

  return (
    <div className={s.container}>
      <div className={s.divTitle}>
        <h2 className={s.title}>Más de {manufacturerName}</h2>
        <button className={s.btnMore} onClick={handleViewMore}>Ver más</button>
      </div>
      <div className={s.navigation}>
        {/* <button className={s.prevButton} onClick={handlePrev}>
          <GrPrevious />
        </button> */}
        <div className={s.divProducts} ref={productsContainerRef}>
          {otherProducts.map((product, index) => (
            <div className={s.productCard} key={`${product.id}-${index}`}>
              <ProductCard 
                name={product.name}
                image={product.mainImage}
                price={product.price}
                logo={manufacturerLogo}
                id={product.id}
              />
            </div>
          ))}
        </div>
        {/* <button className={s.nextButton} onClick={handleNext}>
          <GrNext />
        </button> */}
      </div>
    </div>
  );
};


export default MoreProducts;
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import s from './ProductDetail.module.css';
import { getProductById } from '../../store/actions/productActions';
import { getManufacturerByUserId } from '../../store/actions/manufacturerActions';
import { addToCart } from '../../store/actions/cartActions';
import { formatPrice } from '../../utils/utils';
import Gallery from '../../components/detailProduct/Gallery';
import DataProduct from '../../components/detailProduct/DataProduct';

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.product);
  const loading = useSelector((state) => state.product.loading);
  const error = useSelector((state) => state.product.error);
  const manufacturer = useSelector((state) => state.manufacturer.manufacturer);

  useEffect(() => {
    dispatch(getProductById(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if(product) {
      dispatch(getManufacturerByUserId(product.userId));
    }
  }, [dispatch, product]);

  const handleAddToCart = (variations) => {
    const item = {
      productId: product.id,
      variations,
    };
    dispatch(addToCart(item, product.userId, 'product'));
  };

  if(loading || !product || !manufacturer) {
    return <div>Loading...</div>;
  }
  if(error) {
    return <div>{error}</div>;
  }

  console.log('ProductDetail:', product);

  return (
    <div className={s.container}>
      <div className={s.divHeader}>
        <p>Compra mínima de {formatPrice(manufacturer.minPurchase)} por mayor en {manufacturer.name}</p>
      </div>
      <div className={s.divDetail}>
        <Gallery images={product.images} mainImage={product.mainImage} name={product.name} />
        <DataProduct 
          product={product} 
          manufacturer={manufacturer}
          onAddToCart={handleAddToCart} 
        />
      </div>
    </div>
  );
};


export default ProductDetail;
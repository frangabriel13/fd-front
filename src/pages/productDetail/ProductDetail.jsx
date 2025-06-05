import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import s from './ProductDetail.module.css';
import { getProductById } from '../../store/actions/productActions';
import { getManufacturerByUserId } from '../../store/actions/manufacturerActions';
import { addToCart } from '../../store/actions/cartActions';
import { formatPrice } from '../../utils/utils';
import Gallery from '../../components/detailProduct/Gallery';
import DataProduct from '../../components/detailProduct/DataProduct';
import MoreProducts from '../../components/productRow/MoreProducts';
import RelatedProducts from '../../components/productRow/RelatedProducts';

const ProductDetail = () => {
  const navigate = useNavigate();
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

  if(error) {
    return <div>{error}</div>;
  }
  if(loading || !product || !manufacturer) {
    return <div>Loading...</div>;
  }
  if (!product.images || !Array.isArray(product.images)) {
  return <div>Producto sin imágenes</div>;
}

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
      <div className={s.divMoreProducts}>
        {product.userId && manufacturer.id && manufacturer.name && (
          <MoreProducts
            userId={product.userId}
            manufacturerId={manufacturer.id}
            manufacturerName={manufacturer.name}
            manufacturerLogo={manufacturer.image}
          />
        )}
        { product.categoryId && (
          <RelatedProducts categoryId={product.categoryId} />
        )}
      </div>
      <div className={s.btnHomeContainer}>
        <button className={s.btnHome} onClick={() => navigate('/')}>Inicio</button>
      </div>
    </div>
  );
};


export default ProductDetail;
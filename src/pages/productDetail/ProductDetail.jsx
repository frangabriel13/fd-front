import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import s from './ProductDetail.module.css';
import { getProductById } from '../../store/actions/productActions';
import { getManufacturerByUserId } from '../../store/actions/manufacturerActions';

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.product);
  const loading = useSelector((state) => state.product.loading);
  const error = useSelector((state) => state.product.error);
  const manufacturer = useSelector((state) => state.manufacturer.manufacturer);

  console.log('product:', product);
  console.log('manufacturer:', manufacturer);

  useEffect(() => {
    dispatch(getProductById(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if(product) {
      dispatch(getManufacturerByUserId(product.userId));
    }
  }, [dispatch, product]);

  if(loading) {
    return <div>Loading...</div>;
  }
  if(error) {
    return <div>{error}</div>;
  }

  console.log(product);

  return (
    <div className={s.container}>
      <h1>Product Detail</h1>
      {product && (
        <div>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>{product.price}</p>
        </div>
      )}
    </div>
  );
};


export default ProductDetail;
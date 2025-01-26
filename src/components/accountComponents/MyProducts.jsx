import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsByUserId, deleteProduct } from '../../store/actions/productActions';
import s from './MyProducts.module.css';
import TableMyProducts from './myProducts/TableMyProducts';

const MyProducts = ({ sizes }) => {
  const dispatch = useDispatch();
  const myProducts = useSelector(state => state.product.myProducts);

  useEffect(() => {
    dispatch(getProductsByUserId());
  }, [dispatch]);

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  return (
    <div className={s.container}>
      <TableMyProducts sizes={sizes} myProducts={myProducts} handleDelete={handleDelete} />
    </div>
  )
};

export default MyProducts;
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsByUserId, deleteProduct } from '../../store/actions/productActions';
import s from './MyProducts.module.css';
import TableMyProducts from './myProducts/TableMyProducts';

const MyProducts = () => {
  const dispatch = useDispatch();
  const myProducts = useSelector(state => state.product.myProducts);

  useEffect(() => {
    dispatch(getProductsByUserId());
  }, [dispatch]);

  const handleEdit = (productId) => {
    // Lógica para editar el producto
    console.log(`Edit product with id: ${productId}`);
  };

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  return (
    <div className={s.container}>
      <TableMyProducts myProducts={myProducts} handleEdit={handleEdit} handleDelete={handleDelete} />
    </div>
  )
};

export default MyProducts;
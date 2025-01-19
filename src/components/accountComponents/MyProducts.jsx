import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsByUserId, deleteProduct } from '../../store/actions/productActions';
import s from './MyProducts.module.css';

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
      <h2>My Products</h2>
      <table className={s.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {myProducts && myProducts.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>
                <button onClick={() => handleEdit(product.id)}>Edit</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default MyProducts;
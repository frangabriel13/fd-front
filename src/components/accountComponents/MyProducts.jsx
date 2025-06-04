import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsByUserId, deleteProduct } from '../../store/actions/productActions';
import s from './MyProducts.module.css';
import TableMyProducts from './myProducts/TableMyProducts';

const MyProducts = ({ sizes }) => {
  const dispatch = useDispatch();
  const { myProducts = [], myCurrentPage, myPageSize, myTotalProducts } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(getProductsByUserId());
  }, [dispatch]);

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const handlePageChange = (newPage) => {
    dispatch(getProductsByUserId(newPage));
  };

  console.log(myProducts);
  console.log(myCurrentPage, myPageSize, myTotalProducts);

  return (
    <div className={s.container}>
      <TableMyProducts 
        sizes={sizes} 
        myProducts={myProducts} 
        handleDelete={handleDelete}
        myCurrentPage={myCurrentPage}
        myPageSize={myPageSize}
        myTotalProducts={myTotalProducts}
        onPageChange={handlePageChange}
      />
    </div>
  )
};


export default MyProducts;
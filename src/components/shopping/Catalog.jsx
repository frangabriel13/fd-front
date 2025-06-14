import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './Catalog.module.css';
import { getProducts } from '../../store/actions/productActions';

const Catalog = ({ genderId, categoryId }) => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(getProducts(1, 24, genderId, categoryId));
  }, [dispatch, genderId, categoryId]);

  console.log('Catalog products:', products);

  return (
    <div className={s.container}>
      <h1 className={s.title}>Catalog</h1>
      <p className={s.description}>This is the catalog page.</p>
    </div>
  );
};


export default Catalog;
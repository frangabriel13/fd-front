import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../store/actions/productActions';
import s from './Shopping.module.css';

const Shopping = () => {
  const dispatch = useDispatch();
  const { products } = useSelector(state => state.product);
  const { category, gender, subcategory } = useParams();

  useEffect(() => {
    const filters = { category, gender, subcategory };
    dispatch(getProducts(1, 24, filters, ''));
  }, [dispatch, category, gender, subcategory]);

  console.log('Products:', products);

  return (
    <div className={s.categorySelection}>
      <h3>Shopping</h3>
    </div>
  );
};


export default Shopping;
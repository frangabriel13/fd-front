import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getProducts } from '../../store/actions/productActions';
import s from './Shopping.module.css';

const Shopping = () => {
  const dispatch = useDispatch();
  const { category, gender, subcategory } = useParams();

  useEffect(() => {
    const filters = { category, gender, subcategory };
    dispatch(getProducts(1, 24, filters, ''));
  }, [dispatch, category, gender, subcategory]);

  return (
    <div className={s.categorySelection}>
      <h3>Shopping</h3>
    </div>
  );
};


export default Shopping;
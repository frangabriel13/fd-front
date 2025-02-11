import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserData } from '../../store/actions/storeActions';
import s from './Store.module.css';

const Store = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { manufacturer } = useSelector(state => state.manufacturer);
  const { manufacturerProducts } = useSelector(state => state.product);

  console.log(manufacturer);
  console.log(manufacturerProducts);

  useEffect(() => {
    dispatch(getUserData(userId));
  }, [dispatch, userId]);

  return (
    <div className={s.store}>
      <h1>Tienda del fabricante {userId}</h1>
    </div>
  );
};


export default Store;
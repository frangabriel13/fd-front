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
    <div className={s.container}>
      <div className={s.divHeader}>
        <div className={s.divTitle}>
          <img 
            src={manufacturer.image} 
            alt={manufacturer.name} 
            className={s.imgLogo}
          />
          <h2 className={s.name}>{manufacturer.name}</h2>
        </div>
        <div className={s.divData}>
          <p className={s.followers}>1.123 seguidores</p>
          <button className={s.btnFollow}>Seguir</button>
        </div>
      </div>
    </div>
  );
};


export default Store;
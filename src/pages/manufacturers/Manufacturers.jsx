import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import s from './Manufacturers.module.css';
import { getLiveManufacturers } from '../../store/actions/manufacturerActions';

const Manufacturers = () => {
  const dispatch = useDispatch();
  const { manufacturers } = useSelector(state => state.manufacturer);

  useEffect(() => {
    dispatch(getLiveManufacturers());
  }, [dispatch]);

  console.log('manufacturers', manufacturers);

  return (
    <div className={s.container}>
      <div className={s.divHeader}>
        <h2 className={s.title}>Fabricantes</h2>
      </div>
    </div>
  );
};


export default Manufacturers;
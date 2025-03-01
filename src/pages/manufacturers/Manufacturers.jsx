import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import s from './Manufacturers.module.css';
import { getManufacturers } from '../../store/actions/manufacturerActions';

const Manufacturers = () => {
  const dispatch = useDispatch();
  const manufacturers = useSelector(state => state.manufacturer.manufacturers);

  useEffect(() => {
    dispatch(getManufacturers());
  }, [dispatch]);

  console.log('manufacturers', manufacturers);

  return (
    <div className={s.container}>
      <div className={s.divHeader}>
        <h2 className={s.title}>Fabricantes</h2>
      </div>
      {/* {manufacturers.map((manufacturer) => (
        <div key={manufacturer.id} className={s.divCard}>
          <h3>{manufacturer.name}</h3>
        </div>
      ))} */}
    </div>
  );
};


export default Manufacturers;
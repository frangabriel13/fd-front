import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import s from './Manufacturers.module.css';
import { getManufacturers } from '../../store/actions/manufacturerActions';
import ManufacturerCard from './ManufacturerCard';

const Manufacturers = () => {
  const dispatch = useDispatch();
  const manufacturers = useSelector(state => state.manufacturer.manufacturers);

  useEffect(() => {
    dispatch(getManufacturers());
  }, [dispatch]);

  console.log(manufacturers);

  return (
    <div className={s.container}>
      <div className={s.divHeader}>
        <h2 className={s.title}>Fabricantes</h2>
      </div>
      <div className={s.divManufacturers}>
        {manufacturers.map(manufacturer => (
          <ManufacturerCard key={manufacturer.id} manufacturer={manufacturer} />
        ))}
      </div>
    </div>
  );
};


export default Manufacturers;
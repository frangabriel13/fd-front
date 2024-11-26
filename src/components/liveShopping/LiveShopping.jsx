import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './LiveShopping.module.css';
import { getLiveManufacturers } from '../../store/actions/manufacturerActions';
import LiveManufacturer from './LiveManufacturer';

const LiveShopping = () => {
  const dispatch = useDispatch();
  const liveManufacturers = useSelector((state) => state.manufacturer.liveManufacturers);

  useEffect(() => {
    dispatch(getLiveManufacturers());
  }, [dispatch]);

  return (
    <div className={s.container}>
      <div className={s.divTitle}>
        <h2 className={s.title}>Live Shopping</h2>
        <button className={s.btnMore}>Ver más</button>
      </div>
      <div className={s.liveManufacturers}>
        {liveManufacturers.map((manufacturer) => (
          <LiveManufacturer key={manufacturer.id} manufacturer={manufacturer} />
        ))}
      </div>
    </div>
  )
};


export default LiveShopping;
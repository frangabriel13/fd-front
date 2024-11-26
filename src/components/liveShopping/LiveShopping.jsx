import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './LiveShopping.module.css';
import { getLiveManufacturers } from '../../store/actions/manufacturerActions';
import LiveManufacturer from './LiveManufacturer';
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";

const LiveShopping = () => {
  const dispatch = useDispatch();
  const liveManufacturers = useSelector((state) => state.manufacturer.liveManufacturers);

  useEffect(() => {
    dispatch(getLiveManufacturers());
  }, [dispatch]);

  const multipliedLiveManufacturers = [...liveManufacturers, ...liveManufacturers, ...liveManufacturers, ...liveManufacturers];

  return (
    <div className={s.container}>
      <div className={s.divTitle}>
        <h2 className={s.title}>Live Shopping</h2>
        <button className={s.btnMore}>Ver más</button>
      </div>
      {/* <div className={s.liveManufacturers}>
        {liveManufacturers.map((manufacturer) => (
          <LiveManufacturer key={manufacturer.id} manufacturer={manufacturer} />
        ))}
      </div> */}
      <div className={s.liveManufacturers}>
        {multipliedLiveManufacturers.map((manufacturer) => (
          <LiveManufacturer key={manufacturer.id} manufacturer={manufacturer} />
        ))}
      </div>
    </div>
  )
};


export default LiveShopping;
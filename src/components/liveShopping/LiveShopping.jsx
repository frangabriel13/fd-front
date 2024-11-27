import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './LiveShopping.module.css';
import { getLiveManufacturers } from '../../store/actions/manufacturerActions';
import LiveManufacturer from './LiveManufacturer';
import { GrNext, GrPrevious } from "react-icons/gr";

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
      <div className={s.navigation}>
        <button className={s.navButton}>
          <GrPrevious />
        </button>
        <div className={s.liveManufacturers}>
          {liveManufacturers.map((manufacturer, index) => (
            <LiveManufacturer key={`${manufacturer.id}-${index}`} manufacturer={manufacturer} />
          ))}
        </div>
        <button className={s.navButton}>
          <GrNext />
        </button>
      </div>
    </div>
  );
};

export default LiveShopping;
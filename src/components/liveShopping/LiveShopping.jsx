import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import s from './LiveShopping.module.css';
import { getLiveManufacturers } from '../../store/actions/manufacturerActions';
import LiveManufacturer from './LiveManufacturer';
import { GrNext, GrPrevious } from "react-icons/gr";

const LiveShopping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const liveManufacturers = useSelector((state) => state.manufacturer.liveManufacturers);
  const manufacturersContainerRef = useRef(null);

  useEffect(() => {
    dispatch(getLiveManufacturers());
  }, [dispatch]);

  const handleNext = () => {
    if (manufacturersContainerRef.current) {
      manufacturersContainerRef.current.scrollLeft += manufacturersContainerRef.current.offsetWidth;
    }
  };

  const handlePrev = () => {
    if (manufacturersContainerRef.current) {
      manufacturersContainerRef.current.scrollLeft -= manufacturersContainerRef.current.offsetWidth;
    }
  };

  return (
    <div className={s.container}>
      <div className={s.divTitle}>
        <h2 className={s.title}>Live Shopping</h2>
        <button className={s.btnMore} onClick={() => navigate('/fabricantes')}>Ver más</button>
      </div>
      <div className={s.navigation}>
        <button className={s.prevButton} onClick={handlePrev}>
          <GrPrevious />
        </button>
        <div className={s.liveManufacturers} ref={manufacturersContainerRef}>
          {liveManufacturers.map((manufacturer, index) => (
            <LiveManufacturer key={`${manufacturer.id}-${index}`} manufacturer={manufacturer} />
          ))}
        </div>
        <button className={s.nextButton} onClick={handleNext}>
          <GrNext />
        </button>
      </div>
    </div>
  );
};


export default LiveShopping;
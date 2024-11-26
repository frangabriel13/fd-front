import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './LiveShopping.module.css';
import { getLiveManufacturers } from '../../store/actions/manufacturerActions';
import LiveManufacturer from './LiveManufacturer';
import { GrNext, GrPrevious } from "react-icons/gr";

const LiveShopping = () => {
  const dispatch = useDispatch();
  const liveManufacturers = useSelector((state) => state.manufacturer.liveManufacturers);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 8;

  useEffect(() => {
    dispatch(getLiveManufacturers());
  }, [dispatch]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + itemsPerPage, liveManufacturers.length - itemsPerPage));
  };

  const visibleManufacturers = liveManufacturers.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <div className={s.container}>
      <div className={s.divTitle}>
        <h2 className={s.title}>Live Shopping</h2>
        <button className={s.btnMore}>Ver más</button>
      </div>
      <div className={s.liveManufacturers}>
        <button className={s.btnPrev} onClick={handlePrev} disabled={currentIndex === 0}>
          <GrPrevious />
        </button>
        {visibleManufacturers.map((manufacturer, index) => (
          <LiveManufacturer key={`${manufacturer.id}-${index}`} manufacturer={manufacturer} />
        ))}
        <button className={s.btnNext} onClick={handleNext} disabled={currentIndex + itemsPerPage >= visibleManufacturers.length}>
          <GrNext />
        </button>
      </div>
    </div>
  );
};

export default LiveShopping;
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import s from './LiveShopping.module.css';
// import { getLiveManufacturers } from '../../store/actions/manufacturerActions';
// import LiveManufacturer from './LiveManufacturer';
// import { GrNext, GrPrevious } from "react-icons/gr";

// const LiveShopping = () => {
//   const dispatch = useDispatch();
//   const liveManufacturers = useSelector((state) => state.manufacturer.liveManufacturers);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const itemsPerPage = 8;

//   useEffect(() => {
//     dispatch(getLiveManufacturers());
//   }, [dispatch]);

//   const handlePrev = () => {
//     setCurrentIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
//   };

//   const handleNext = () => {
//     setCurrentIndex((prevIndex) => Math.min(prevIndex + itemsPerPage, liveManufacturers.length * 8 - itemsPerPage));
//   };

//   // Multiplicar el array de fabricantes por 8
//   const multipliedManufacturers = Array(8).fill(liveManufacturers).flat();
//   const visibleManufacturers = multipliedManufacturers.slice(currentIndex, currentIndex + itemsPerPage);

//   return (
//     <div className={s.container}>
//       <div className={s.divTitle}>
//         <h2 className={s.title}>Live Shopping</h2>
//         <button className={s.btnMore}>Ver más</button>
//       </div>
//       <div className={s.liveManufacturers}>
//         <button className={s.btnPrev} onClick={handlePrev} disabled={currentIndex === 0}>
//           <GrPrevious />
//         </button>
//         {visibleManufacturers.map((manufacturer, index) => (
//           <LiveManufacturer key={`${manufacturer.id}-${index}`} manufacturer={manufacturer} />
//         ))}
//         <button className={s.btnNext} onClick={handleNext} disabled={currentIndex + itemsPerPage >= multipliedManufacturers.length}>
//           <GrNext />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LiveShopping;
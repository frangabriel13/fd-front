import { useEffect, useState } from 'react';
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

  useEffect(() => {
    dispatch(getLiveManufacturers());
  }, [dispatch]);

  return (
    <div className={s.container}>
      <div className={s.divTitle}>
        <h2 className={s.title}>Live Shopping</h2>
        <button className={s.btnMore} onClick={() => navigate('/fabricantes')}>Ver más</button>
      </div>
      <div className={s.navigation}>
        <button className={s.prevButton}>
          <GrPrevious />
        </button>
        <div className={s.liveManufacturers}>
          {liveManufacturers.map((manufacturer, index) => (
            <LiveManufacturer key={`${manufacturer.id}-${index}`} manufacturer={manufacturer} />
          ))}
        </div>
        <button className={s.nextButton}>
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
//   const [currentPage, setCurrentPage] = useState(0);
//   const itemsPerPage = 8;

//   useEffect(() => {
//     dispatch(getLiveManufacturers());
//   }, [dispatch]);

//   const multipliedManufacturers = liveManufacturers.flatMap(manufacturer =>
//     Array(4).fill(manufacturer)
//   );

//   const totalPages = Math.ceil(multipliedManufacturers.length / itemsPerPage);

//   const handleNext = () => {
//     setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
//   };

//   const handlePrev = () => {
//     setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
//   };

//   const startIndex = currentPage * itemsPerPage;
//   const displayedManufacturers = multipliedManufacturers.slice(startIndex, startIndex + itemsPerPage);

//   return (
//     <div className={s.container}>
//       <div className={s.divTitle}>
//         <h2 className={s.title}>Live Shopping</h2>
//         <button className={s.btnMore}>Ver más</button>
//       </div>
//       <div className={s.navigation}>
//         <button className={s.prevButton} onClick={handlePrev}>
//           <GrPrevious />
//         </button>
//         <div className={s.liveManufacturers}>
//           {displayedManufacturers.map((manufacturer, index) => (
//             <LiveManufacturer key={`${manufacturer.id}-${index}`} manufacturer={manufacturer} />
//           ))}
//         </div>
//         <button className={s.nextButton} onClick={handleNext}>
//           <GrNext />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LiveShopping;
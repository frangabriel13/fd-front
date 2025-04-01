import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getNewPacks } from '../../store/actions/packActions';
import s from './ProductRow.module.css';
import { GrNext, GrPrevious } from "react-icons/gr";
import PackCard from '../packStore/packCard';

const PacksRow = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { newPacks, loading, error } = useSelector((state) => state.pack);
  const packsContainerRef = useRef(null);

  useEffect(() => {
    dispatch(getNewPacks());
  }, [dispatch]);

  const handleViewMore = () => {
    navigate('/tienda?type=pack&sortBy=newest');
  };

  const handleNext = () => {
    if (packsContainerRef.current) {
      packsContainerRef.current.scrollLeft += packsContainerRef.current.offsetWidth;
    }
  };

  const handlePrev = () => {
    if (packsContainerRef.current) {
      packsContainerRef.current.scrollLeft -= packsContainerRef.current.offsetWidth;
    }
  };

  console.log(newPacks);
  
  return (
    <div className={s.container}>
      <div className={s.divTitle}>
        <h2 className={s.title}>Packs/Combos</h2>
        <button className={s.btnMore} onClick={handleViewMore}>Ver más</button>
      </div>
      <div className={s.navigation}>
        <button className={s.prevButton} onClick={handlePrev}>
          <GrPrevious />
        </button>
        <div className={s.divProducts} ref={packsContainerRef}>
          {newPacks.map((pack, index) => (
            <div className={s.productCard} key={`${pack.id}-${index}`}>
              <PackCard 
                name={pack.name}
                price={pack.price}
                logo={pack.logo}
                id={pack.id}
                products={pack.products}
              />
            </div>
          ))}
        </div>
        <button className={s.nextButton} onClick={handleNext}>
          <GrNext />
        </button>
      </div>
    </div>
  );
};


export default PacksRow;
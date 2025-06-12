import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPacks } from '../../store/actions/packActions';
import s from './Packs.module.css';
import PackCard from '../../components/packStore/packCard';
import Pagination from '../../components/Pagination/Pagination';

const Packs = () => {
  const dispatch = useDispatch();
  const { packs, currentPage, totalPacks } = useSelector(state => state.pack);
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    dispatch(getPacks(currentPage, 2, sortBy));
  }, [dispatch, currentPage, sortBy]);

  const handlePageChange = (page) => {
    dispatch(getPacks(page, 2, sortBy));
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className={s.container}>
      <div className={s.divHeader}>
        <h2 className={s.title}>Packs/Combos</h2>
      </div>
      <div className={s.divPacks}>
        <div className={s.divSelect}>
          <select className={s.select} value={sortBy} onChange={handleSortChange}>
            <option value="newest">Más Nuevos</option>
            <option value="lowestPrice">Menor precio</option>
            <option value="highestPrice">Mayor precio</option>
          </select>
        </div>
        <div className={s.divProducts}>
          {packs && packs.length > 0 ? (
            packs.map((pack, index) => (
              <div className={s.productCard} key={`${pack.id}-${index}`}>
                <PackCard
                  name={pack.name}
                  price={pack.price}
                  logo={pack.logo}
                  id={pack.id}
                  products={pack.products}
                />
              </div>
            ))
          ) : (
            <p>No hay packs disponibles.</p>
          )}
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalProducts={totalPacks}
        pageSize={2}
        onPageChange={handlePageChange}
      />
    </div>
  );
};


export default Packs;
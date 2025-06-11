import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPacks } from '../../store/actions/packActions';
import s from './Packs.module.css';
import PackCard from '../../components/packStore/packCard';
import Pagination from '../../components/Pagination/Pagination';

const Packs = () => {
  const dispatch = useDispatch();
  const { packs, currentPage, totalPacks } = useSelector(state => state.pack);

  useEffect(() => {
    dispatch(getPacks(currentPage, 24));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    dispatch(getPacks(page, 24));
  };

  return (
    <div className={s.container}>
      <div className={s.divHeader}>
        <h2 className={s.title}>Packs/Combos</h2>
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
      <Pagination
        currentPage={currentPage}
        totalProducts={totalPacks}
        pageSize={24}
        onPageChange={handlePageChange}
      />
    </div>
  );
};


export default Packs;
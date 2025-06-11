import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPacks } from '../../store/actions/packActions';
import s from './Packs.module.css';
import PackCard from '../../components/packStore/packCard';

const Packs = () => {
  const dispatch = useDispatch();
  const { packs } = useSelector(state => state.pack);

  useEffect(() => {
    dispatch(getPacks());
  }, [dispatch]);

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
    </div>
  );
};


export default Packs;
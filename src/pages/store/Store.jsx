import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserData } from '../../store/actions/storeActions';
import s from './Store.module.css';
import Products from '../../components/productStore/Products';
import Pagination from '../../components/pagination/Pagination';

const Store = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { manufacturer } = useSelector(state => state.manufacturer);
  const { manufacturerProducts, manufacturerCurrentPage, manufacturerTotalProducts } = useSelector(state => state.product);
  const pageSize = 18; // Tamaño de la página fijo
  const [sortOrder, setSortOrder] = useState('newest');

  useEffect(() => {
    dispatch(getUserData(userId, 1, pageSize, sortOrder));
  }, [dispatch, userId, pageSize, sortOrder]);

  const handlePageChange = (page) => {
    dispatch(getUserData(userId, page, pageSize, sortOrder));
  };

  const handleSortChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
    dispatch(getUserData(userId, 1, pageSize, newSortOrder));
  };

  return (
    <div className={s.container}>
      <div className={s.divHeader}>
        <div className={s.divTitle}>
          <img 
            src={manufacturer.image} 
            alt={manufacturer.name} 
            className={s.imgLogo}
          />
          <h2 className={s.name}>{manufacturer.name}</h2>
        </div>
        <div className={s.divData}>
          <p className={s.followers}>1.123 seguidores</p>
          <button className={s.btnFollow}>Seguir</button>
        </div>
      </div>
      <div className={s.divProducts}>
        <Products products={manufacturerProducts} onSortChange={handleSortChange} />
        <Pagination 
          currentPage={manufacturerCurrentPage} 
          totalProducts={manufacturerTotalProducts} 
          pageSize={pageSize} 
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};


export default Store;
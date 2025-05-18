import s from './Favorites.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFavorites, deleteFavorite } from '../../store/actions/favoriteActions';
import TableFavorites from './TableFavorites';

const Favorites = () => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.favorite);

  useEffect(() => {
    dispatch(getFavorites());
  }, [dispatch]);

  const handleDelete = (productId) => {
    dispatch(deleteFavorite(productId));
  };

  console.log('favorites', favorites);
  return (
    <div className={s.container}>
      <TableFavorites favorites={favorites} onDelete={handleDelete} />
    </div>
  );
};


export default Favorites;
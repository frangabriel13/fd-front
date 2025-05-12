import s from './Favorites.module.css';
import TableFavorites from './TableFavorites';

const Favorites = () => {
  return (
    <div className={s.container}>
      <TableFavorites />
    </div>
  );
};


export default Favorites;
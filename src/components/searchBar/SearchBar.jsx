import s from './SearchBar.module.css';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  return (
    <div className={s.container}>
      <div className={s.divSearch}>
        <input type="text" className={s.input} placeholder="Buscar productos, fabricantes y más..." />
        <button className={s.searchBtn}>
          <FaSearch className={s.icon} />
        </button>
      </div>
    </div>
  );
};


export default SearchBar;
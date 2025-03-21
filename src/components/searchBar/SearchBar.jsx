import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './SearchBar.module.css';
import { FaSearch } from 'react-icons/fa';
import { searchResults } from '../../store/actions/productActions';
import SearchResults from './SearchResults';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const results = useSelector((state) => state.product.results);

  useEffect(() => {
    const delayDebunceFn = setTimeout(() => {
      if(searchTerm) {
        dispatch(searchResults(searchTerm));
        setShowResults(true);
      } else {
        setShowResults(false);
      }
    }, 1000);

    return () => clearTimeout(delayDebunceFn);
  }, [searchTerm, dispatch]);

  return (
    <div className={s.container}>
      <div className={s.divSearch}>
        <input 
          type="text" 
          className={s.input} 
          placeholder="Buscar productos, fabricantes y más..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}   
        />
        <button className={s.searchBtn}>
          <FaSearch className={s.icon} />
        </button>
      </div>
      {showResults && <SearchResults results={results} />}
    </div>
  );
};


export default SearchBar;
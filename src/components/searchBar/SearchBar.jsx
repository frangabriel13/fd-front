import { useState, useEffect, useRef } from 'react';
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
  const searchRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if(searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResultSelect = () => {
    setShowResults(false);
  };

  return (
    <div className={s.container} ref={searchRef}>
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
      {showResults && <SearchResults results={results} onResultSelect={handleResultSelect} />}
    </div>
  );
};


export default SearchBar;
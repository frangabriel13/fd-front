import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './SearchBar.module.css';
import { FaSearch } from 'react-icons/fa';
import { searchProducts } from '../../store/actions/productActions';
import SearchResults from './SearchResults';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const products = useSelector((state) => state.product.searchProducts);

  useEffect(() => {
    const delayDebunceFn = setTimeout(() => {
      if(searchTerm) {
        dispatch(searchProducts(1, 18, searchTerm));
        setShowResults(true);
      } else {
        setShowResults(false);
      }
    }, 1000);

    return () => clearTimeout(delayDebunceFn);
  }, [searchTerm, dispatch]);

  console.log(products);

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
      {showResults && <SearchResults products={products} />}
    </div>
  );
};


export default SearchBar;
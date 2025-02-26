import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './SearchBar.module.css';
import { FaSearch } from 'react-icons/fa';
import { searchProducts } from '../../store/actions/productActions';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    const delayDebunceFn = setTimeout(() => {
      if(searchTerm) {
        dispatch(searchProducts(1, 18, searchTerm));
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
    </div>
  );
};


export default SearchBar;
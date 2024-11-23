import s from './SearchBar.module.css';

const SearchBar = () => {
  return (
    <div className={s.container}>
      <input type="text" className={s.input} placeholder="Search" />
    </div>
  );
};


export default SearchBar;
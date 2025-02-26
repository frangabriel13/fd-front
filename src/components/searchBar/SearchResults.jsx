import s from './SearchResults.module.css';

const SearchResults = ({ products }) => {
  return (
    <div className={s.container}>
      <div className={s.divResults}>
        <p>Productos</p>
        <ul>
          {products.slice(0, 3).map((product) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};


export default SearchResults;
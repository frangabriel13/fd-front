import s from './SearchResults.module.css';

const SearchResults = ({ results }) => {
  console.log('results', results);

  return (
    <div className={s.container}>
      {results.products.length > 0 && (
        <div className={s.divResults}>
          <p>Productos</p>
          <ul>
            {results.products.slice(0, 3).map((product) => (
              <li key={product.id}>{product.name}</li>
            ))}
          </ul>
        </div>
      )}
      {results.categories && results.categories.length > 0 && (
        <div className={s.divResults}>
          <p>Categorías</p>
          <ul>
            {results.categories.slice(0, 3).map((category) => (
              <li key={category.id}>{category.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};


export default SearchResults;
import { Link } from 'react-router-dom';
import s from './SearchResults.module.css';

const SearchResults = ({ results }) => {
  const hasProducts = results.product.products.length > 0;
  const hasCategories = results.product.categories && results.product.categories.length > 0;
  const hasUsers = results.user && results.user.length > 0;

  return (
    <div className={s.container}>
      {hasProducts && (
        <div className={s.divResults}>
          <p>Productos</p>
          <ul>
            {results.product.products.slice(0, 3).map((product) => (
              <li key={product.id}>
                <Link className={s.link} to={`/producto/${product.id}`}>{product.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {hasCategories && (
        <div className={s.divResults}>
          <p>Categorías</p>
          <ul>
            {results.product.categories.slice(0, 3).map((category) => (
              <li key={category.id}>
                <Link className={s.link} to={`/categoria/${category.id}`}>{category.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {hasUsers && (
        <div className={s.divResults}>
          <p>Fabricante</p>
          <ul>
            <li key={results.user[0].id}>
              <Link className={s.link} to={`/store/${results.user[0].id}`}>{results.user[0].name}</Link>
            </li>
          </ul>
        </div>
      )}
      {!hasProducts && !hasCategories && !hasUsers && (
        <div className={s.noResults}>
          <p>No se encontraron resultados</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
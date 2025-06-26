import s from './Search.module.css';

const Search = () => {
  return (
    <div className={s.container}>
      <h2>Búsqueda</h2>
      <p className={s.description}>
        Aquí podrás buscar productos, marcas o categorías. Utiliza la barra de búsqueda para encontrar lo que necesitas.
      </p>
    </div>
  );
};


export default Search;
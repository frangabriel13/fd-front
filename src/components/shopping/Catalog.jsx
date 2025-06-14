import s from './Catalog.module.css';

const Catalog = ({ genderId, categoryId }) => {
  return (
    <div className={s.container}>
      <h1 className={s.title}>Catalog</h1>
      <p className={s.description}>This is the catalog page.</p>
    </div>
  );
};


export default Catalog;
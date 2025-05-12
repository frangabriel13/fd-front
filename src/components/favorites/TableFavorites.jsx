import s from './TableFavorites.module.css';

const TableFavorites = () => {
  return (
    <div className={s.container}>
      <h3>Mis favoritos</h3>
      <div className={s.divData}>
        <div className={s.divFavorites}>
          <table className={s.table}></table>
        </div>
      </div>
    </div>
  )
};


export default TableFavorites;
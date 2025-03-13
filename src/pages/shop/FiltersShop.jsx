import s from './FiltersShop.module.css';

const FiltersShop = () => {
  return (
    <div className={s.container}>
      <div className={s.divFilter}>
        <label className={s.label}>Tipo:</label>
        <select className={s.select}>
          <option>Productos</option>
          <option>Packs</option>
        </select>
      </div>
      <div className={s.divFilter}>
        <label className={s.label}>Categoría:</label>
        <select className={s.select}>
          <option>Indumentaria</option>
          <option>Blanquería</option>
          <option>Bisutería</option>
        </select>
      </div>
      <div className={s.divFilter}>
        <label className={s.label}>Subcategoría:</label>
        <select className={s.select}>
          <option>Indumentaria</option>
          <option>Blanquería</option>
          <option>Bisutería</option>
        </select>
      </div>
      <div className={s.divFilter}>
        <label className={s.label}>Género:</label>
        <select className={s.select}>
          <option>Todos</option>
          <option>Hombre</option>
          <option>Mujer</option>
          <option>Niño</option>
          <option>Niña</option>
          <option>Bebés</option>
        </select>
      </div>
      <div className={s.divFilter}>
        <label className={s.label}>Ordenar por:</label>
        <select className={s.select}>
          <option>Más nuevos</option>
          <option>Menor precio</option>
          <option>Mayor precio</option>
        </select>
      </div>
    </div>
  );
};


export default FiltersShop;
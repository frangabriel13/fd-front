import { useState } from 'react';
import { useSelector } from 'react-redux';
import s from './FiltersShop.module.css';

const FiltersShop = () => {
  const categories = useSelector((state) => state.category.categories);
  const [ category, setCategory ] = useState(1);
  const mainCategories = categories.filter(category => !category.parentId);
  const subCategories = categories.filter(subCategory => subCategory.parentId === category);

  console.log('subCategories', subCategories);
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
        <select 
          className={s.select}
          value={category}
          onChange={(e) => setCategory(parseInt(e.target.value))}
        >
          {
            mainCategories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))
          }
        </select>
      </div>
      <div className={s.divFilter}>
        <label className={s.label}>Subcategoría:</label>
        <select className={s.select}>
          <option value="All">Todos</option>
          {
            subCategories.map(subCategory => (
              <option key={subCategory.id} value={subCategory.id}>{subCategory.name}</option>
            ))
          }
        </select>
      </div>
      <div className={s.divFilter}>
        <label className={s.label}>Género:</label>
        <select className={s.select}>
          <option value='All'>Todos</option>
          <option value='1'>Hombre</option>
          <option value='2'>Mujer</option>
          <option value='3'>Niño</option>
          <option value='4'>Niña</option>
          <option value='5'>Bebés</option>
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
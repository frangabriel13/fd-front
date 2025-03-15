import { useState } from 'react';
import { useSelector } from 'react-redux';
import s from './FiltersShop.module.css';

const FiltersShop = ({ onFilterChange, genders }) => {
  const categories = useSelector((state) => state.category.categories);
  const [ category, setCategory ] = useState(1);
  const [type, setType] = useState('product');
  const mainCategories = categories.filter(category => !category.parentId);
  const subCategories = categories.filter(subCategory => subCategory.parentId === category);

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setType(value);
    onFilterChange({ type: value });
  };

  const handleCategoryChange = (e) => {
    const value = parseInt(e.target.value);
    setCategory(value);
    onFilterChange({ category: value, subcategory: '' });
  };

  const handleSubcategoryChange = (e) => {
    const value = e.target.value;
    onFilterChange({ subcategory: value });
  };

  const handleGenderChange = (e) => {
    onFilterChange({ gender: e.target.value });
  };

  const handleSortByChange = (e) => {
    onFilterChange({ sortBy: e.target.value });
  };

  return (
    <div className={s.container}>
      <div className={s.divFilter}>
        <label className={s.label}>Tipo:</label>
        <select className={s.select} onChange={handleTypeChange}>
          <option value="product">Productos</option>
          <option value="pack">Packs</option>
        </select>
      </div>
      {type !== 'pack' && (
        <>
          <div className={s.divFilter}>
            <label className={s.label}>Categoría:</label>
            <select 
              className={s.select}
              value={category}
              onChange={handleCategoryChange}
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
            <select className={s.select} onChange={handleSubcategoryChange}>
              <option value="">Todos</option>
              {
                subCategories.map(subCategory => (
                  <option key={subCategory.id} value={subCategory.id}>{subCategory.name}</option>
                ))
              }
            </select>
          </div>
          <div className={s.divFilter}>
            <label className={s.label}>Género:</label>
            <select className={s.select} onChange={handleGenderChange}>
              <option value=''>Todos</option>
              {
                genders.map(gender => (
                  <option key={gender.id} value={gender.id}>{gender.name}</option>
                ))
              }
            </select>
          </div>
        </>
      )}
      <div className={s.divFilter}>
        <label className={s.label}>Ordenar por:</label>
        <select className={s.select} onChange={handleSortByChange}>
          <option value="newest">Más nuevos</option>
          <option value="lowestPrice">Menor precio</option>
          <option value="highestPrice">Mayor precio</option>
        </select>
      </div>
    </div>
  );
};


export default FiltersShop;
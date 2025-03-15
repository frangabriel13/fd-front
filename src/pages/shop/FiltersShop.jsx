import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import s from './FiltersShop.module.css';

const FiltersShop = ({ onFilterChange, genders }) => {
  const categories = useSelector((state) => state.category.categories);
  const [category, setCategory] = useState(1);
  const [type, setType] = useState('product');
  const mainCategories = categories.filter(category => !category.parentId);
  const subcategories = useMemo(() => categories.filter(subcategory => subcategory.parentId === category), [categories, category]);
  const [subcategory, setSubcategory] = useState('');
  const [filteredGenders, setFilteredGenders] = useState(genders);
  const [gender, setGender] = useState('');

  useEffect(() => {
    if (subcategory) {
      const selectedSubcategory = subcategories.find(sub => sub.id === parseInt(subcategory));
      if (selectedSubcategory) {
        const newFilteredGenders = genders.filter(gender => selectedSubcategory.genders.some(subGender => subGender.id === gender.id));
        setFilteredGenders(newFilteredGenders.length > 0 ? newFilteredGenders : genders);
      }
    } else {
      setFilteredGenders(genders);
    }
  }, [subcategory, subcategories, genders]);

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setType(value);
    onFilterChange({ type: value });
  };

  const handleCategoryChange = (e) => {
    const value = parseInt(e.target.value);
    setCategory(value);
    setSubcategory('');
    setGender('');
    onFilterChange({ category: value, subcategory: '', gender: '' });
  };

  const handleSubcategoryChange = (e) => {
    const value = e.target.value;
    setSubcategory(value);
    onFilterChange({ subcategory: value });
  };

  const handleGenderChange = (e) => {
    onFilterChange({ gender: e.target.value });
  };

  const handleSortByChange = (e) => {
    onFilterChange({ sortBy: e.target.value });
  };

  console.log('genders: ', genders)

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
            <select className={s.select} value={subcategory} onChange={handleSubcategoryChange}>
              <option value="">Todos</option>
              {
                subcategories.map(subcategory => (
                  <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
                ))
              }
            </select>
          </div>
          <div className={s.divFilter}>
            <label className={s.label}>Género:</label>
            <select className={s.select} value={gender} onChange={handleGenderChange}>
              <option value=''>Todos</option>
              {
                filteredGenders.map(gender => (
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
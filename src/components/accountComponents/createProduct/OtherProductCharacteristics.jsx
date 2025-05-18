import { useState } from 'react';
import s from './OtherProductCharacteristics.module.css';
import { filterCategoriesByParentAndGender } from '../../../utils/utils';

const OtherProductCharacteristics = ({ productType, setProductType, categories, onShowForm }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    onShowForm(null);
  };

  const handleNextClick = () => {
    if(!selectedCategory) {
      setErrorMessage('Por favor, selecciona una categoría antes de continuar.');
      return;
    }
    setErrorMessage('');
    onShowForm({
      productType,
      selectedCategory,
    });
  };

  const filteredCategories = filterCategoriesByParentAndGender(categories, productType.id);

  return (
    <div className={s.container}>
      <div className={s.divFinal}>
        <div className={s.divCategory}>
          <h3>¿A qué categoría pertenece tu producto?</h3>
          <select onChange={handleCategoryChange}>
            <option value={""}>Selecciona una categoría</option>
            {filteredCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errorMessage && <p className={s.errorMessage}>{errorMessage}</p>}
        </div>
        <hr className={s.divider} />
        <div className={s.divBtn}>
          <button className={s.btnNext} onClick={handleNextClick}>Siguiente</button>
        </div>
      </div>
    </div>
  );
};


export default OtherProductCharacteristics;
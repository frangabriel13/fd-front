import { useState } from 'react';
import s from './OtherProductCharacteristics.module.css';
import { filterCategoriesByParentAndGender } from '../../../utils/utils';

const OtherProductCharacteristics = ({ productType, setProductType, categories }) => {
  const filteredCategories = filterCategoriesByParentAndGender(categories, productType.id, null);

  return (
    <div className={s.container}>
      <div className={s.divCategory}>
        <h3>¿A qué categoría pertenece tu producto?</h3>
        <select>
          <option>Selecciona una categoría</option>
          {filteredCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};


export default OtherProductCharacteristics;
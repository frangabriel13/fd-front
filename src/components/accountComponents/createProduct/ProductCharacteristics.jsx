import { useState } from 'react';
import s from './ProductCharacteristics.module.css';
import { FaChild, FaChildDress, FaBaby } from "react-icons/fa6";
import { IoWoman, IoMan } from "react-icons/io5";
import { filterCategoriesByParentAndGender } from '../../../utils/utils';

const ProductCharacteristics = ({ productType, setProductType, categories, onShowForm }) => {
  const [typeProduct, setTypeProduct] = useState(null);
  const [genderProduct, setGenderProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleTypeClick = (type) => {
    setTypeProduct(type);
  };

  const handleGenderClick = (gender) => {
    setGenderProduct(gender);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleNextClick = () => {
    onShowForm({
      productType,
      genderProduct,
      selectedCategory,
    });
  };

  const filteredCategories = filterCategoriesByParentAndGender(categories, productType.id, genderProduct);

  return (
    <div className={s.container}>
      <div className={s.divTitle}>
        <h3>Características principales</h3>
        <p>Completa las siguientes características de tu producto</p>
      </div>
      <div className={s.divTypes}>
        <h4>¿Tu producto viene en uno o varios colores?</h4>
        <div className={s.divButtons}>
          <button 
            className={`${s.btn} ${typeProduct === 'uniqueSize' ? s.selected : ''}`} 
            onClick={() => handleTypeClick('uniqueSize')}
          >
            <span>TALLE ÚNICO</span>
            <span>VARIOS COLORES</span>
          </button>
          <button 
            className={`${s.btn} ${typeProduct === 'variousSizes' ? s.selected : ''}`} 
            onClick={() => handleTypeClick('variousSizes')}
          >
            <span>VARIOS TALLES</span>
            <span>ÚNICO COLOR</span>
          </button>
        </div>
      </div>
      <div className={s.divGenres}>
        <h4>¿A qué género está dirigido tu producto?</h4>
        <div className={s.divIcons}>
          <button 
            className={`${s.btnIcon} ${genderProduct === 1 ? s.selected : ''}`} 
            onClick={() => handleGenderClick(1)}
          >
            <IoMan className={s.icon} />
            <span>Hombre</span>
          </button>
          <button 
            className={`${s.btnIcon} ${genderProduct === 2 ? s.selected : ''}`} 
            onClick={() => handleGenderClick(2)}
          >
            <IoWoman className={s.icon} />
            <span>Mujer</span>
          </button>
          <button 
            className={`${s.btnIcon} ${genderProduct === 3 ? s.selected : ''}`} 
            onClick={() => handleGenderClick(3)}
          >
            <FaChild className={s.icon} />
            <span>Niño</span>
          </button>
          <button 
            className={`${s.btnIcon} ${genderProduct === 4 ? s.selected : ''}`} 
            onClick={() => handleGenderClick(4)}
          >
            <FaChildDress className={s.icon} />
            <span>Niña</span>
          </button>
          <button 
            className={`${s.btnIcon} ${genderProduct === 5 ? s.selected : ''}`} 
            onClick={() => handleGenderClick(5)}
          >
            <FaBaby className={s.icon} />
            <span>Bebés</span>
          </button>
        </div>
      </div>
      <div className={s.divFinal}>
        <div className={s.divCategory}>
          <h4>¿A qué categoría pertenece tu producto?</h4>
          <select onChange={handleCategoryChange}>
            <option>Selecciona una categoría</option>
            {filteredCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <hr className={s.divider} />
        <div className={s.divBtn}>
          <button className={s.btnNext} onClick={handleNextClick}>Siguiente</button>
        </div>
      </div>
    </div>
  );
};


export default ProductCharacteristics;
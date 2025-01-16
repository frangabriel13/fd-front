import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../store/actions/categoryActions';
import s from './ProductCharacteristics.module.css';
import { FaChild, FaChildDress, FaBaby } from "react-icons/fa6";
import { IoWoman, IoMan } from "react-icons/io5";
import SimpleProductForm from './SimpleProductForm';

const ProductCharacteristics = ({ productType, setProductType }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const [typeProduct, setTypeProduct] = useState(null);
  const [genderProduct, setGenderProduct] = useState(null);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleTypeClick = (type) => {
    setTypeProduct(type);
  };

  const handleGenderClick = (gender) => {
    setGenderProduct(gender);
  }

  console.log('categories', categories);

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
            className={`${s.btnIcon} ${genderProduct === 'man' ? s.selected : ''}`} 
            onClick={() => handleGenderClick('man')}
          >
            <IoMan className={s.icon} />
            <span>Hombre</span>
          </button>
          <button 
            className={`${s.btnIcon} ${genderProduct === 'woman' ? s.selected : ''}`} 
            onClick={() => handleGenderClick('woman')}
          >
            <IoWoman className={s.icon} />
            <span>Mujer</span>
          </button>
          <button 
            className={`${s.btnIcon} ${genderProduct === 'boy' ? s.selected : ''}`} 
            onClick={() => handleGenderClick('boy')}
          >
            <FaChild className={s.icon} />
            <span>Niño</span>
          </button>
          <button 
            className={`${s.btnIcon} ${genderProduct === 'girl' ? s.selected : ''}`} 
            onClick={() => handleGenderClick('girl')}
          >
            <FaChildDress className={s.icon} />
            <span>Niña</span>
          </button>
          <button 
            className={`${s.btnIcon} ${genderProduct === 'baby' ? s.selected : ''}`} 
            onClick={() => handleGenderClick('baby')}
          >
            <FaBaby className={s.icon} />
            <span>Bebés</span>
          </button>
        </div>
      </div>
      <div className={s.divCategory}>
        <h4>¿A qué categoría pertenece tu producto?</h4>
        <select>
          <option>Selecciona una categoría</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};


export default ProductCharacteristics;
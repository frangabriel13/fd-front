import { useState } from 'react';
import s from './Dropdown.module.css';
import { GrNext } from "react-icons/gr";
import { filterCategoriesByParentAndGender } from '../../utils/utils';
import Subcategories from './Subcategories';

const Dropdown = ({ categories }) => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const handleMouseEnter = (parentId) => {
    setHoveredCategory(parentId);
  }

  const handleMouseLeave = () => {
    setHoveredCategory(null);
  }

  return (
    <div className={s.dropdown} onMouseLeave={handleMouseLeave}>
      <div className={s.container}>
        <div className={s.divCategories}>
          <div 
            className={`${s.divCategory} ${hoveredCategory === 1 ? s.active : ''}`} 
            onMouseEnter={() => handleMouseEnter(1)}
          >
            Indumentaria
            <GrNext className={s.icon} />
          </div>
          <div 
            className={`${s.divCategory} ${hoveredCategory === 2 ? s.active : ''}`} 
            onMouseEnter={() => handleMouseEnter(2)}
          >
            Blanquería
            <GrNext className={s.icon} />
          </div>
          <div 
            className={`${s.divCategory} ${hoveredCategory === 3 ? s.active : ''}`} 
            onMouseEnter={() => handleMouseEnter(3)}
          >
            Bisutería
            <GrNext className={s.icon} />
          </div>
        </div>
      </div>
      <div className={s.divSubcategories}>
        {hoveredCategory && 
          <Subcategories 
          categories={filterCategoriesByParentAndGender(categories, hoveredCategory, null)} 
        />}
      </div>
    </div>
  );
};


export default Dropdown;
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
    <div className={s.dropdown}>
      <div className={s.container}>
        <div className={s.divCategories}>
          <div className={s.divCategory} onMouseEnter={() => handleMouseEnter(1)} onMouseLeave={handleMouseLeave}>
            Indumentaria
            <GrNext className={s.icon} />
          </div>
          <div className={s.divCategory} onMouseEnter={() => handleMouseEnter(2)} onMouseLeave={handleMouseLeave}>
            Bisutería
            <GrNext className={s.icon} />
          </div>
          <div className={s.divCategory} onMouseEnter={() => handleMouseEnter(3)} onMouseLeave={handleMouseLeave}>
            Blanquería
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
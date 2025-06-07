import { useState } from 'react';
import GenderSelection from './GenderSelection';
import s from './CategorySelection.module.css';

const CategorySelection = ({ categories, onSelect, isIndumentaria }) => {
  // Estado para el género seleccionado solo si es indumentaria
  const [selectedGenderId, setSelectedGenderId] = useState(
    isIndumentaria && categories.length > 0 ? categories[0].gender.id : null
  );

  // Si es indumentaria, filtra las categorías por género
  let filteredCategories = [];
  if (isIndumentaria) {
    const genderObj = categories.find(cat => cat.gender.id === selectedGenderId);
    filteredCategories = genderObj ? genderObj.categories : [];
  } else if (categories.length > 0 && categories[0].categories) {
    // Para blanquería o bisutería
    filteredCategories = categories[0].categories;
  }

  return (
    <div className={s.container}>
      {isIndumentaria && (
        <GenderSelection
          selectedGenderId={selectedGenderId}
          onSelect={setSelectedGenderId}
          genders={categories.map(cat => cat.gender)}
        />
      )}
      <div className={s.divCategories}>
        {filteredCategories.map((cat) => (
          <div
            key={cat.id}
            className={s.card}
            onClick={() => onSelect(cat)}
            tabIndex={0}
            role="button"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className={s.image}
            />
            <div className={s.name}>{cat.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default CategorySelection;
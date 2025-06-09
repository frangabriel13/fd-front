import s from './GenderSelection.module.css';

const GenderSelection = ({ selectedGenderId, onSelect, genders }) => {
  return (
    <div className={s.container}>
      <div className={s.gendersRow}>
        {genders.map(gender => (
          <button
            key={gender.id}
            className={`${s.genderBtn} ${selectedGenderId === gender.id ? s.selected : ''}`}
            onClick={() => onSelect(gender.id)}
            type="button"
          >
            {gender.name}
          </button>
        ))}
      </div>
    </div>
  );
};


export default GenderSelection;
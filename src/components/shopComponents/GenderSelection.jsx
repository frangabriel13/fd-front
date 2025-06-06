import s from './GenderSelection.module.css';

const genders = [
  { label: 'Femenino', value: 'Femenino' },
  { label: 'Masculino', value: 'Masculino' },
  { label: 'Unisex', value: 'Unisex' },
];

const GenderSelection = ({ onSelect }) => {
  return (
    <div className={s.container}>
      <h3 className={s.title}>Géneros</h3>
      <div className={s.genders}>
        {genders.map((gender) => (
          <button
            key={gender.value}
            className={s.genderBtn}
            onClick={() => onSelect(gender.value)}
            type="button"
          >
            {gender.label}
          </button>
        ))}
      </div>
    </div>
  );
};


export default GenderSelection;
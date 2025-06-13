import s from './GenderFilter.module.css';

const GenderFilter = ({ selectedGender, onSelect, genders }) => {
  return (
    <div className={s.container}>
      {genders.map(gender => (
        <button
          key={gender.id}
          onClick={() => onSelect(gender.url)}
          className={`${s.button} ${selectedGender === gender.url ? s.selected : ''}`}
        >
          {gender.name}
        </button>
      ))}
    </div>
  )
};


export default GenderFilter;
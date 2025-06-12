import s from './GenderFilter.module.css';
import { genders } from '../../utils/hardcodeo';

const GenderFilter = ({ selectedGender, onSelect }) => {
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
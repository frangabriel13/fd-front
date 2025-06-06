import s from './CategorySelection.module.css';

const categories = [
  { label: 'Indumentaria', value: 'Indumentaria' },
  { label: 'Blanquería', value: 'Blanquería' },
  { label: 'Bisutería', value: 'Bisutería' },
];

const CategorySelection = ({ onSelect }) => {
  return (
    <div className={s.container}>
      <h3 className={s.title}>Selecciona una categoría</h3>
      <div className={s.categories}>
        {categories.map((cat) => (
          <button
            key={cat.value}
            className={s.categoryBtn}
            onClick={() => onSelect(cat.value)}
            type="button"
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
};


export default CategorySelection;
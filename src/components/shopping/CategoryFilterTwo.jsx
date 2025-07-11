import s from './CategoryFilterTwo.module.css';

const CategoryFilterTwo = ({ categories, onSelect, selectedCategory }) => {
  return (
    <div className={s.container}>
      {categories.map((cat, idx) => (
        <div
          key={idx}
          className={`${s.item} ${selectedCategory === cat.url ? s.selected : ''}`}
          onClick={() => onSelect(cat.url)}
        >
          <img src={cat.img} alt={cat.name} className={s.image} />
          <span className={s.name}>{cat.name}</span>
        </div>
      ))}
    </div>
  );
};


export default CategoryFilterTwo;
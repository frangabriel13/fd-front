import s from './Subcategories.module.css';

const Subcategories = ({ categories }) => {
  return(
    <div className={s.container}>
      <h5 className={s.title}>{categories[0].parent.name}</h5>
      <hr className={s.divider} />
      <ul className={s.ul}>
        {categories.map(category => (
          <li key={category.id} className={s.li}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};


export default Subcategories;
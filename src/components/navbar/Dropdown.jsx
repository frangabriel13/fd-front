import s from './Dropdown.module.css';

const Dropdown = ({ categories }) => {
  return (
    <div className={s.container}>
      {categories.map((category) => (
        <div key={category._id} className={s.category}>
          {category.name}
        </div>
      ))}
    </div>
  );
};


export default Dropdown;
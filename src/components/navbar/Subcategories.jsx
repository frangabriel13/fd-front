import s from './Subcategories.module.css';

const Subcategories = ({ categories }) => {
  return(
    <div className={s.container}>
      <h5>{categories[0].parent.name}</h5>
    </div>
  );
};


export default Subcategories;
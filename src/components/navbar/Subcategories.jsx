import { useNavigate } from 'react-router-dom';
import s from './Subcategories.module.css';

const Subcategories = ({ categories }) => {
  const navigate = useNavigate();

  const handleClick = (category) => {
    const parentId = category.parent.id;
    const subcategoryId = category.id;
    // navigate(`/tienda/${parentId}/${subcategoryId}`, {
    //   state: { category }
    // });
    navigate(
      `/tienda?type=product&category=${parentId}&subcategory=${subcategoryId}&gender=&sortBy=&searchTerm=`
    );
  };

  return(
    <div className={s.container}>
      <h5 className={s.title}>{categories[0].parent.name}</h5>
      <hr className={s.divider} />
      <ul className={s.ul}>
        {categories.map(category => (
          <li 
            key={category.id} 
            className={s.li}
            onClick={() => handleClick(category)}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};


export default Subcategories;
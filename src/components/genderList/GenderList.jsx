import { useNavigate } from 'react-router-dom';
import s from './GenderList.module.css';
import { FaChild, FaChildDress, FaBaby } from "react-icons/fa6";
import { IoWoman, IoMan } from "react-icons/io5";

const GenderList = () => {
  const navigate = useNavigate();

  const handleClick = (gender) => {
    navigate(`/tienda?type=product&category=&subcategory=&gender=${gender}&sortBy=&searchTerm=`);
  };

  return(
    <div className={s.container}>
      <button 
        className={`${s.btnIcon}`} 
        onClick={() => handleClick(1)}
      >
        <IoMan className={s.icon} />
        <span>Hombre</span>
      </button>
      <button 
        className={`${s.btnIcon}`}
        onClick={() => handleClick(2)}
      >
        <IoWoman className={s.icon} />
        <span>Mujer</span>
      </button>
      <button 
        className={`${s.btnIcon}`}
        onClick={() => handleClick(3)}
      >
        <FaChild className={s.icon} />
        <span>Niño</span>
      </button>
      <button 
        className={`${s.btnIcon}`}
        onClick={() => handleClick(4)}
      >
        <FaChildDress className={s.icon} />
        <span>Niña</span>
      </button>
      <button 
        className={`${s.btnIcon}`}
        onClick={() => handleClick(5)}
      >
        <FaBaby className={s.icon} />
        <span>Bebés</span>
      </button>
    </div>
  )
};


export default GenderList;
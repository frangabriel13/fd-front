import s from './GenderList.module.css';
import { FaChild, FaChildDress, FaBaby } from "react-icons/fa6";
import { IoWoman, IoMan } from "react-icons/io5";

const GenderList = () => {
  return(
    <div className={s.container}>
      <button 
        className={`${s.btnIcon}`} 
      >
        <IoMan className={s.icon} />
        <span>Hombre</span>
      </button>
      <button 
        className={`${s.btnIcon}`}
      >
        <IoWoman className={s.icon} />
        <span>Mujer</span>
      </button>
      <button 
        className={`${s.btnIcon}`}
      >
        <FaChild className={s.icon} />
        <span>Niño</span>
      </button>
      <button 
        className={`${s.btnIcon}`}
      >
        <FaChildDress className={s.icon} />
        <span>Niña</span>
      </button>
      <button 
        className={`${s.btnIcon}`}
      >
        <FaBaby className={s.icon} />
        <span>Bebés</span>
      </button>
    </div>
  )
};


export default GenderList;
import s from './Dropdown.module.css';
import { GrNext } from "react-icons/gr";

const Dropdown = ({ categories }) => {
  return (
    <div className={s.container}>
      <div className={s.divCategories}>
        <div className={s.divCategory}>
          Indumentaria
          <GrNext className={s.icon} />
        </div>
        <div className={s.divCategory}>
          Bisutería
          <GrNext className={s.icon} />
        </div>
        <div className={s.divCategory}>
          Blanquería
          <GrNext className={s.icon} />
        </div>
      </div>
    </div>
  );
};


export default Dropdown;
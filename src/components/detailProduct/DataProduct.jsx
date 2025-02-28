import s from './DataProduct.module.css';
import { 
  BsHeart, 
  BsFillHeartFill,
  BsStar,
  BsStarHalf,
  BsStarFill,
} from "react-icons/bs";

const DataProduct = ({ product, manufacturer }) => {

  return (
    <div className={s.container}>
      <div className={s.divHeader}>
        <div className={s.divCategory}>
          <p>{product.category.name} | {product.category.parent.name} | {product.gender.name}</p>
          {/* <p>{product.category.name} | {product.category.parent.name}</p> */}
        </div>
        <div className={s.divName}>
          <div className={s.divTitle}>
            <h2 className={s.title}>{product.name}</h2>
            <BsHeart className={s.iconHeart} />
          </div>
          <div className={s.divCalification}>
            <p>3.5</p>
            <div className={s.stars}>
              <BsStarFill className={s.iconStar} />
              <BsStarFill className={s.iconStar} />
              <BsStarFill className={s.iconStar} />
              <BsStarHalf className={s.iconStar} />
              <BsStar className={s.iconStar} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default DataProduct;
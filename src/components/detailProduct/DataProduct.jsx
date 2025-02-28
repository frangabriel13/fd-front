import s from './DataProduct.module.css';
import { 
  BsHeart, 
  BsFillHeartFill,
  BsStar,
  BsStarHalf,
  BsStarFill,
} from "react-icons/bs";

const DataProduct = ({ product, manufacturer }) => {
  console.log(product, manufacturer);

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
            <div className={s.points}>3.5</div>
            <div className={s.stars}>
              <BsStarFill />
              <BsStarFill />
              <BsStarFill />
              <BsStarHalf />
              <BsStar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default DataProduct;
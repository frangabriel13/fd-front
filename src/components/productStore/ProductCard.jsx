import s from './ProductCard.module.css';

const ProductCard = ({ name, image, price }) => {
  return (
    <div className={s.container}>
      <h4>{name}</h4>
      <p>{price}</p>
    </div>
  );
};


export default ProductCard;
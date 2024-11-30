import s from './ProductCard.module.css';

const ProductCard = ({ product }) => {

  return (
    <div className={s.container}>
      <div className={s.divImage}>
        <img src={product.mainImage} alt={product.name} className={s.image} />
      </div>
      <div className={s.information}>
        <h3 className={s.name}>{product.name}</h3>
        <p>{product.id}</p>
        <p className={s.price}>${product.price}</p>
        <p className={s.discount}>Paga $2000 con tu compra superior a $40000 en éste fabricante</p>
      </div>
    </div>
  )
};


export default ProductCard;
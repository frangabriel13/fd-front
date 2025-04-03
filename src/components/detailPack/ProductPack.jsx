import s from './ProductPack.module.css';

const ProductPack = ({ product }) => {
  console.log(product);
  return(
    <div className={s.container}>
      <div className={s.divImage}>
        <img src={product.mainImage} alt={product.name} className={s.image} />
      </div>
    </div>
  )
};


export default ProductPack;
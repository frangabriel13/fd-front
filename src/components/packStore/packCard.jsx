import { useNavigate } from 'react-router-dom';
import s from './PackCard.module.css';
import { formatPrice } from '../../utils/utils';

const ProductCard = ({ id, name, image, price, logo, products }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pack/${id}`);
  };

  const displayedProducts = products.length >= 4 
  ? products.slice(0, 4)
  : products.length > 0
    ? [...products, ...Array(4 - products.length).fill(products[0])].slice(0, 4)
    : Array(4).fill(null);

  console.log('displayedProducts', displayedProducts);

  return (
    <div className={s.container} onClick={handleClick}>
      <div className={s.divImage}>
        <div className={s.divLogo}>
          <img src={logo} alt={name} className={s.logo} />
        </div>
        <div className={s.divImages}>
          {displayedProducts.map((product, index) => (
            product && product.mainImage ? (
              <img 
                key={index} 
                src={product.mainImage} 
                alt={product.name} 
                className={s.image} 
              />
            ) : (
              <div key={index} className={s.imagePlaceholder}>Sin producto</div>
            )
          ))}
        </div>
      </div>
      <div className={s.divData}>
        <h4 className={s.name}>{name}</h4>
        <p className={s.price}>{formatPrice(price)}</p>
      </div>
    </div>
  );
};


export default ProductCard;
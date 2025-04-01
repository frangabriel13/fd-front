import { useNavigate } from 'react-router-dom';
import s from './PackCard.module.css';
import { formatPrice } from '../../utils/utils';

const ProductCard = ({ id, name, image, price, logo, products }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/producto/${id}`);
  };

  const displayedProducts = products.length >= 4 
    ? products.slice(0, 4)
    : [...products, ...Array(4 - products.length).fill(products[0])].slice(0, 4);

  console.log('products', products);

  return (
    <div className={s.container} onClick={handleClick}>
      <div className={s.divImage}>
        <div className={s.divLogo}>
          <img src={logo} alt={name} className={s.logo} />
        </div>
        <div className={s.divImages}>
          {displayedProducts.map((product, index) => (
            <img 
              key={index} 
              src={product.mainImage} 
              alt={product.name} 
              className={s.image} 
            />
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
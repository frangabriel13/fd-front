// import { useNavigate } from 'react-router-dom';
// import s from './ProductCard.module.css';
// import { formatPrice } from '../../utils/utils';

// const ProductCard = ({ id, name, image, price, manufacturerId, minPurchase, logo }) => {
//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate(`/producto/${id}`);
//   };

//   return (
//     <div className={s.container} onClick={handleClick}>
//       <div className={s.divImage}>
//         <div className={s.divLogo}>
//           <img src={logo} alt={name} className={s.logo} />
//         </div>
//         <img src={image} alt={name} className={s.image} />
//       </div>
//       <div className={s.divData}>
//         <h4 className={s.name}>{name}</h4>
//         <p className={s.price}>{formatPrice(price)}</p>
//       </div>
//     </div>
//   );
// };


// export default ProductCard;

import { Link } from 'react-router-dom';
import s from './ProductCard.module.css';
import { formatPrice } from '../../utils/utils';

const ProductCard = ({ id, name, image, price, manufacturerId, minPurchase, logo }) => {
  return (
    <Link to={`/producto/${id}`} className={s.container}>
      <div className={s.divImage}>
        <div className={s.divLogo}>
          <img src={logo} alt={name} className={s.logo} />
        </div>
        <img src={image} alt={name} className={s.image} />
      </div>
      <div className={s.divData}>
        <h4 className={s.name}>{name}</h4>
        <p className={s.price}>{formatPrice(price)}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
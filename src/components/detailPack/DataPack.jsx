import { useState } from 'react';
import s from './DataPack.module.css';
import { 
  BsHeart, 
  BsFillHeartFill,
  BsStar,
  BsStarHalf,
  BsStarFill,
} from "react-icons/bs";
import { formatPrice } from '../../utils/utils';
import ProductPack from './ProductPack';
import SuccessModal from '../modals/SuccessModal';

const DataPack = ({ pack, onAddToCart }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCartClick = () => {
    onAddToCart(pack);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Cerrar el modal
  };

  return(
    <div className={s.container}>
      <div className={s.divHeader}>
        <div className={s.divCategory}>
          <p>Packs</p>
        </div>
        <div className={s.divName}>
          <div className={s.divTitle}>
            <h2 className={s.title}>{pack.name}</h2>
            {/* <BsHeart className={s.iconHeart} /> */}
          </div>
          {/* <div className={s.divCalification}>
            <p>3.5</p>
            <div className={s.stars}>
              <BsStarFill className={s.iconStar} />
              <BsStarFill className={s.iconStar} />
              <BsStarFill className={s.iconStar} />
              <BsStarHalf className={s.iconStar} />
              <BsStar className={s.iconStar} />
            </div>
          </div> */}
        </div>
      </div>
      <div className={s.divPrice}>
        <div className={s.wholePrice}>
          <p className={s.price}>{formatPrice(pack.price)}</p>
          <p className={s.whole}>Comprando al por mayor</p>
        </div>
        {/* <div className={s.wholePrice}>
          <p className={s.price}>U$D 10,00</p>
          <p className={s.whole}>Comprando en dólares</p>
        </div> */}
      </div>
      <div className={s.divProducts}>
        {pack.products.map((product) => (
          <ProductPack key={product.id} product={product} />
        ))}
      </div>
      <div className={s.divCart}>
        <button className={s.btnCart} onClick={handleAddToCartClick}>Añadir al carrito</button>
      </div>
      {isModalOpen && (
        <SuccessModal 
          title={'Pack añadido'} 
          message={"El pack seleccionado se ha añadido al carrito correctamente."} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  )
};


export default DataPack;
import { useState } from 'react';
import s from './DataProduct.module.css';
import { 
  BsHeart, 
  BsFillHeartFill,
  BsStar,
  BsStarHalf,
  BsStarFill,
} from "react-icons/bs";
import { formatPrice } from '../../utils/utils';

const DataProduct = ({ product, manufacturer }) => {
  const [quantities, setQuantities] = useState(
    product.inventories.map((inv) => ({ id: inv.id, quantity: inv.quantity || 0 }))
  );

  const handleDecrement = (id) => {
    setQuantities((prevQuantities) => 
      prevQuantities.map((inv) => 
        inv.id === id ? { ...inv, quantity: Math.max(0, inv.quantity - 1) } : inv
      )
    );
  };
  
  const handleIncrement = (id) => {
    setQuantities((prevQuantities) => 
      prevQuantities.map((inv) => 
        inv.id === id ? { ...inv, quantity: inv.quantity + 1 } : inv
      )
    );
  }

  const handleChange = (id, value) => {
    const newValue = Math.max(0, parseInt(value) || 0);
    setQuantities((prevQuantities) => 
      prevQuantities.map((inv) => 
        inv.id === id ? { ...inv, quantity: newValue } : inv
      )
    );
  }
  
  return (
    <div className={s.container}>
      <div className={s.divHeader}>
        <div className={s.divCategory}>
          <p>{product.category.name} | {product.category.parent.name}</p>
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
      <div className={s.divPrice}>
        <div className={s.wholePrice}>
          <p className={s.price}>{formatPrice(product.price)}</p>
          <p className={s.whole}>Comprando al por mayor</p>
        </div>
        <div className={s.wholePrice}>
          <p className={s.price}>U$D 10,00</p>
          <p className={s.whole}>Comprando en dólares</p>
        </div>
      </div>
      <div className={s.divQuantities}>
        <p>Selecciona las cantidades:</p>
        {
          product.inventories.map((inv) => {
            return (
              <div key={inv.id} className={s.divInventory}>
                {product.isVariable ? (
                  <p>{inv.color}</p>
                ) : (
                  <p>{inv.size}</p>
                )}
                <div className={s.divQuant}>
                  <button 
                    className={s.buttonQuant}
                    onClick={() => handleDecrement(inv.id)}
                  >-</button>
                  <input 
                    type="number" 
                    className={s.inputQuant}
                    value={quantities.find((q) => q.id === inv.id).quantity}
                    onChange={(e) => handleChange(inv.id, e.target.value)}
                  />
                  <button 
                    className={s.buttonQuant}
                    onClick={() => handleIncrement(inv.id)}
                  >+</button>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};


export default DataProduct;
import { useState } from 'react';
import s from './UploadProduct.module.css';
import { PiTShirtLight, PiTowel } from "react-icons/pi";
import { GiBigDiamondRing } from "react-icons/gi";
import ProductCharacteristics from './createProduct/ProductCharacteristics';

const UploadProduct = () => {
  const [productType, setProductType] = useState(null);

  const handleTypeClick = (type) => {
    setProductType(type);
  }

  return (
    <div className={s.container}>
      <div className={s.divHeader}>
        <div className={s.divTitle}>
          <h2>Subir producto</h2>
          <p>Elige el tipo de producto que quieres publicar</p>
        </div>
        <div className={s.divTypes}>
          <div className={s.divCard} onClick={() => handleTypeClick('Indumentaria')}>
            <PiTShirtLight className={s.icon} />
            <p>Indumentaria</p>
          </div>
          <div className={s.divCard} onClick={() => handleTypeClick('Blanquería')}>
            <PiTowel className={s.icon} />
            <p>Blanquería</p>
          </div>
          <div className={s.divCard} onClick={() => handleTypeClick('Bisutería')}>
            <GiBigDiamondRing className={s.icon} />
            <p>Bisutería</p>
          </div>
        </div>
      </div>
      {productType && <ProductCharacteristics productType={productType} setProductType={setProductType} />}
    </div>
  )
};


export default UploadProduct;
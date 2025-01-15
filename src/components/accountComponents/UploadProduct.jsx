import { useState } from 'react';
import s from './UploadProduct.module.css';
import { PiTShirtLight, PiTowel } from "react-icons/pi";
import { GiBigDiamondRing } from "react-icons/gi";

const UploadProduct = () => {
  const [productType, setProductType] = useState(null);

  const handleTypeClick = (type) => {
    setProductType(type);
  }

  return (
    <div className={s.container}>
      <div className={s.divTitle}>
        <h2>Subir producto</h2>
        <p>Elige el tipo de producto que quieres publicar</p>
      </div>
      <div className={s.divTypes}>
        <div className={s.divCard}>
          <PiTShirtLight className={s.icon} />
          <p>Indumentaria</p>
        </div>
        <div className={s.divCard}>
          <PiTowel className={s.icon} />
          <p>Blanquería</p>
        </div>
        <div className={s.divCard}>
          <GiBigDiamondRing className={s.icon} />
          <p>Bisutería</p>
        </div>
      </div>
    </div>
  )
};


export default UploadProduct;
import s from './ProductCharacteristics.module.css';

const ProductCharacteristics = ({ productType, setProductType }) => {
  return (
    <div className={s.container}>
      <div className={s.divTitle}>
        <h3>Características principales</h3>
        <p>Completa las siguientes características de tu producto</p>
      </div>
      <div className={s.divTypes}>
        <h4>¿Tu producto viene en uno o varios colores?</h4>
        <div className={s.divButtons}>
          <button className={s.btn}>
            <span>TALLE ÚNICO</span>
            <span>VARIOS COLORES</span>
          </button>
          <button className={s.btn}>
            <span>VARIOS TALLES</span>
            <span>ÚNICO COLOR</span>
          </button>
        </div>
      </div>
    </div>
  );
};


export default ProductCharacteristics;
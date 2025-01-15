import s from './UploadProduct.module.css';

const UploadProduct = () => {
  return (
    <div className={s.container}>
      <div className={s.divTitle}>
        <h2>Subir producto</h2>
        <p>Elige el tipo de producto que quieres publicar</p>
      </div>
      <div className={s.divTypes}></div>
    </div>
  )
};


export default UploadProduct;
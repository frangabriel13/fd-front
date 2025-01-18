import s from './ImageModal.module.css';

const ImageModal = ({ onClose }) => {
  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={s.modal} onClick={handleClickOutside}>
      <div className={s.modalContent}>
        <div className={s.container}>
          <div className={s.divTitle}>
            <h3>Selecciona las imágenes</h3>
            <p>Selecciona las tres imágenes que mejor representen a tu producto</p>
          </div>
          <hr className={s.divider} />
          <div className={s.divBtn}>
            <button className={s.btnCancel} onClick={onClose}>Cerrar</button>
            <button className={s.btnNext} type='button'>Aceptar</button>
          </div>
        </div>
      </div>
    </div>
  )
};


export default ImageModal;
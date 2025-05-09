import s from './SuccessModal.module.css';

const SuccessModal = ({ title, message, onClose, showContactButton, orderId }) => {
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
            <h3>{title}</h3>
            <p>{message}</p>
          </div>
          <hr className={s.divider} />
          <div className={s.divBtn}>
            {showContactButton && (
              <button className={s.btnContact}>
                Contactar
              </button>
            )}
            <button className={s.btnCancel} onClick={onClose}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default SuccessModal;
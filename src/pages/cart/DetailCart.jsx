import s from './DetailCart.module.css';

const DetailCart = ({ cart, onClose }) => {
  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  console.log('cart', cart);

  return (
    <div className={s.modal} onClick={handleClickOutside}>
      <div className={s.modalContent}>
        <div className={s.container}>
          detalle
        </div>
      </div>
    </div>
  )
};


export default DetailCart;
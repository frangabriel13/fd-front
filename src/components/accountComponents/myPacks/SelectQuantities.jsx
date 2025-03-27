import s from './SelectQuantities.module.css';

const SelectQuantities = ({ products, onClose }) => {
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
            <h3>Seleccionar cantidades</h3>
            <p>Selecciona los cantidades que deseas agregar de cada producto</p>
          </div>
        </div>
      </div>
    </div>
  )
};


export default SelectQuantities;
import s from './SelectProducts.module.css';

const SelectProducts = ({ myProducts, selectedProducts, onClose, onSelect }) => {
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
            <h3>Seleccionar productos</h3>
            <p>Selecciona los productos que deseas agregar a tu pack de emprendedor</p>
          </div>
        </div>
      </div>
    </div>
  )
};


export default SelectProducts;
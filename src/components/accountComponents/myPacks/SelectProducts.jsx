import s from './SelectProducts.module.css';
import { formatPrice } from '../../../utils/utils';

const SelectProducts = ({ myProducts, selectedProducts, onClose, onSelect }) => {
  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCheckboxChange = (product) => {
    const isSelected = selectedProducts.some(selected => selected.id === product.id);
    let updatedSelectedProducts;

    if(isSelected) {
      updatedSelectedProducts = selectedProducts.filter(selected => selected.id !== product.id);
    } else {
      updatedSelectedProducts = [...selectedProducts, product];
    }

    onSelect(updatedSelectedProducts);
  };

  return (
    <div className={s.modal} onClick={handleClickOutside}>
      <div className={s.modalContent}>
        <div className={s.container}>
          <div className={s.divTitle}>
            <h3>Seleccionar productos</h3>
            <p>Selecciona los productos que deseas agregar a tu pack de emprendedor</p>
          </div>
          <div className={s.divList}>
            {myProducts.map(product => (
              <div key={product.id} className={s.productItem}>
                <div className={s.dataProduct}>
                  <img src={product.mainImage} alt={product.name} className={s.productImage} />
                  <div className={s.productInfo}>
                    <h4>{product.name}</h4>
                    <p>{formatPrice(product.price)}</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={selectedProducts.some(selected => selected.id === product.id)}
                  onChange={() => handleCheckboxChange(product)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={s.divDivider}>
          <hr className={s.divider} />
          <div className={s.divBtn}>
            <button className={s.btnCancel} onClick={onClose}>Cerrar</button>
            <button className={s.btnNext} type='submit'>Guardar</button>
          </div>
        </div>
      </div>
    </div>
  )
};


export default SelectProducts;
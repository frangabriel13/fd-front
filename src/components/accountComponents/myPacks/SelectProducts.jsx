import { useState } from 'react';
import s from './SelectProducts.module.css';
import { formatPrice } from '../../../utils/utils';

const SelectProducts = ({ myProducts, selectedProducts, onClose, onSelect }) => {
  const [tempSelectedProducts, setTempSelectedProducts] = useState(selectedProducts);
  
  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCheckboxChange = (product) => {
    const isSelected = tempSelectedProducts.some(selected => selected.id === product.id);
    let updatedSelectedProducts;

    if(isSelected) {
      updatedSelectedProducts = tempSelectedProducts.filter(selected => selected.id !== product.id);
    } else {
      updatedSelectedProducts = [...tempSelectedProducts, product];
    }

    setTempSelectedProducts(updatedSelectedProducts);
  };

  const handleSave = () => {
    onSelect(tempSelectedProducts);
    onClose();
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
                  checked={tempSelectedProducts.some(selected => selected.id === product.id)}
                  onChange={() => handleCheckboxChange(product)}
                  className={s.check}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={s.divDivider}>
          <hr className={s.divider} />
          <div className={s.divBtn}>
            <button className={s.btnCancel} onClick={onClose}>Cerrar</button>
            <button className={s.btnNext} onClick={handleSave}>Guardar</button>
          </div>
        </div>
      </div>
    </div>
  )
};


export default SelectProducts;
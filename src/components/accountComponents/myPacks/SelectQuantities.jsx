import { useState } from 'react';
import s from './SelectQuantities.module.css';

const SelectQuantities = ({ products, onClose, onSave }) => {
  console.log('products', products);
  const [updatedProducts, setUpdatedProducts] = useState(products);

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleQuantityChange = (productId, inventoryId, value) => {
  const newProducts = updatedProducts.map(product => {
    if (product.id === productId) {
      const updatedQuantities = product.quantities.map(quantity =>
        quantity.id === inventoryId
          ? { ...quantity, quantity: value === "" ? "" : parseInt(value) || 0 }
          : quantity
      );

      return {
        ...product,
        quantities: updatedQuantities,
      };
    }
    return product;
  });

  setUpdatedProducts(newProducts);
};

  const handleSave = () => {
    onSave(updatedProducts); // Llamar a onSave con los productos actualizados
    onClose(); // Cerrar el modal
  };

  return (
    <div className={s.modal} onClick={handleClickOutside}>
      <div className={s.modalContent}>
        <div className={s.container}>
          <div className={s.divTitle}>
            <h3>Seleccionar cantidades</h3>
            <p>Selecciona las cantidades que deseas agregar de cada producto</p>
          </div>
          <div className={s.divList}>
            {updatedProducts.map(product => (
              <div key={product.id} className={s.productItem}>
                <h4>{product.name}</h4>
                <div className={s.list}>
                  {product.inventories.map(inv => {
                    // Usar directamente product.quantities
                    const quantityObj = product.quantities.find(q => q.id === inv.id) || { quantity: 0 };

                    return (
                      <div key={inv.id} className={s.variantItem}>
                        <h5>{product.isVariable ? inv.color : inv.size}</h5>
                        <div className={s.quantity}>
                          <h5>Cantidad:</h5>
                          <input
                            type="number"
                            value={quantityObj.quantity === 0 ? (quantityObj.quantity === "" ? "" : 0) : quantityObj.quantity}
                            onChange={(e) =>
                              handleQuantityChange(product.id, inv.id, e.target.value)
                            }
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
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
  );
};

export default SelectQuantities;
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
        // Determinar si usar product.productpack.quantities o product.quantities
        const updatedQuantities = (product.productpack?.quantities || product.quantities).map(quantity =>
          quantity.id === inventoryId
            ? { ...quantity, quantity: parseInt(value) || 0 }
            : quantity
        );
  
        // Actualizar la propiedad correcta
        if (product.productpack) {
          return {
            ...product,
            productpack: {
              ...product.productpack,
              quantities: updatedQuantities,
            },
          };
        } else {
          return {
            ...product,
            quantities: updatedQuantities,
          };
        }
      }
      return product;
    });
  
    setUpdatedProducts(newProducts); // Actualizar el estado local
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
                    // Determinar si usar product.quantities o product.productpack.quantities
                    const quantities = product.productpack?.quantities || product.quantities;
                    const quantityObj = quantities.find(q => q.id === inv.id) || { quantity: 0 };

                    return (
                      <div key={inv.id} className={s.variantItem}>
                        <h5>{product.isVariable ? inv.color : inv.size}</h5>
                        <div className={s.quantity}>
                          <h5>Cantidad:</h5>
                          <input
                            type="number"
                            value={quantityObj.quantity}
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
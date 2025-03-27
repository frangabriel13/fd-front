import s from './SelectQuantities.module.css';

const SelectQuantities = ({ products, onClose }) => {
  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  console.log('products', products);

  return (
    <div className={s.modal} onClick={handleClickOutside}>
      <div className={s.modalContent}>
        <div className={s.container}>
          <div className={s.divTitle}>
            <h3>Seleccionar cantidades</h3>
            <p>Selecciona los cantidades que deseas agregar de cada producto</p>
          </div>
          <div className={s.divList}>
            {
              products.map(product => (
                <div key={product.id} className={s.productItem}>
                  <div className={s.dataProduct}>
                    <h4>{product.name}</h4>
                    <div className={s.list}>
                      {
                        product.isVariable ? (
                          product.inventories.map(inv => (
                            <div key={inv.id} className={s.variantItem}>
                              <h5>{inv.color}</h5>
                            </div>
                          ))
                        ) : (
                          product.inventories.map(inv => (
                            <div key={inv.id} className={s.variantItem}>
                              <h5>{inv.size}</h5>
                            </div>
                          ))
                        )
                      }
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
};


export default SelectQuantities;
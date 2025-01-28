import { useState } from 'react';
import { createPack } from '../../../store/actions/packActions';
import s from './CreatePack.module.css';
import SelectProducts from './SelectProducts';
import { formatPrice } from '../../../utils/utils';

const CreatePack = ({ onClose, myProducts }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectProductsModal, setSelectProductsModal] = useState(false);

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const openSelectProducts = () => {
    setSelectProductsModal(true);
  };

  const closeSelectProduct = () => {
    setSelectProductsModal(false);
  }

  const handleSelectProducts = (products) => {
    setSelectedProducts(products);
    closeSelectProduct();
  };

  const handleDeleteProduct = (id) => {
    setSelectedProducts(selectedProducts.filter(product => product.id !== id));
  };

  return (
    <div className={s.modal} onClick={handleClickOutside}>
      <div className={s.modalContent}>
        <div className={s.container}>
          <div className={s.divTitle}>
            <h3>Crear pack</h3>
            <p>Completa los campos para crear el pack de emprendedores</p>
          </div>
          <form className={s.form}>
            <div className={s.divForm}>
              <div className={s.divInputs}>
                <div className={s.divInput}>
                  <h4 className={s.label}>Nombre</h4>
                  <input
                    className={s.input}
                    type="text"
                    name="name"
                  />
                </div>
                <div className={s.divInput}>
                  <h4 className={s.label}>Precio</h4>
                  <input
                    className={s.input}
                    type="number"
                    name="price"
                  />
                </div>
              </div>
              <div className={s.divDescription}>
                <h4 className={s.label}>Descripción</h4>
                <textarea
                  className={s.textarea}
                  name="description"
                />
              </div>
              <div className={s.divProducts}>
                <button type='button' className={s.btnAdd} onClick={openSelectProducts}>Seleccionar productos</button>
                <div className={s.list}>
                  {selectedProducts.map(product => (
                    <div key={product.id} className={s.productItem}>
                      <div className={s.dataProduct}>
                        <img src={product.mainImage} alt={product.name} className={s.productImage} />
                        <div className={s.productInfo}>
                          <h4>{product.name}</h4>
                          <p>{formatPrice(product.price)}</p>
                        </div>
                      </div>
                      <div className={s.divActions}>
                        <div className={s.quantity}>
                          <h5>Cantidad:</h5>
                          <input type="number" />
                        </div>
                        <button className={s.btnDelete} onClick={() => handleDeleteProduct(product.id)}>X</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <hr className={s.divider} />
            <div className={s.divBtn}>
              <button className={s.btnCancel} onClick={onClose}>Cerrar</button>
              <button className={s.btnNext} type='submit'>Guardar</button>
            </div>
          </form>
        </div>
      </div>
      {selectProductsModal && 
        <SelectProducts 
          onClose={closeSelectProduct} 
          myProducts={myProducts}
          selectedProducts={selectedProducts}
          onSelect={handleSelectProducts}
        />}
    </div>
  )
};


export default CreatePack;
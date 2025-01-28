import { useState } from 'react';
import s from './CreatePack.module.css';
import SelectProducts from './SelectProducts';

const CreatePack = ({ onClose, myProducts }) => {
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
                <button type='button' onClick={openSelectProducts}>Seleccionar productos</button>
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
      {selectProductsModal && <SelectProducts onClose={closeSelectProduct} myProducts={myProducts} />}
    </div>
  )
};


export default CreatePack;
import s from './EditManufacturer.module.css';

const EditManufacturer = ({ user, closeModal }) => {
  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className={s.modal} onClick={handleClickOutside}>
      <div className={s.modalContent}>
        <div className={s.container}>
          <div className={s.container}>
            <h3>Editar Información</h3>
            <form className={s.form}>
              <div className={s.divInputs}>
                <div className={s.divInput}>
                  <h4>Nombre del fabricante</h4>
                  <input 
                    className={s.input}
                    type="text"
                    name="owner"
                  />
                </div>
                <div className={s.divInput}>
                  <h4>Nombre de la tienda</h4>
                  <input 
                    className={s.input} 
                    type="text"
                    name="name"
                  />
                </div>
              </div>
              <div className={s.divInputs}>
                <div className={s.divInput}>
                  <h4>Número de teléfono</h4>
                  <input 
                    className={s.input} 
                    type="text"
                    name="phone"
                  />
                </div>
                <div className={s.divInput}>
                  <h4>Mínimo de compra</h4>
                  <input 
                    className={s.input}
                    type="number"
                    name="minPurchase"
                  />
                </div>
              </div>
              <div className={s.divInputAddress}>
                <div className={s.divInputCheck}>
                  <h4>¿Cuénta con punto de venta?</h4>
                  <input 
                    className={s.inputCheck}
                    type="checkbox"
                  />
                </div>
                <div className={s.inputAddress}>
                  <h4>Dirección</h4>
                  <input 
                    className={`${s.input}`} 
                    type="text" 
                    name="street"
                  />
                </div>
              </div>
              <div className={s.divBtn}>
                <button className={s.btnForm} type='submit'>Guardar cambios</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
};


export default EditManufacturer;
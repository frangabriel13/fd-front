import s from './EditManufacturer.module.css';

const EditManufacturer = ({ manufacturer, onClose }) => {
  return (
    <div className={s.modal}>
      <div className={s.modalContent}>
        <div className={s.container}>
          <h3>Editar información</h3>
          <form className={s.form}>
            <div className={s.divInputAddress}>
              <div className={s.divInputCheck}>
                <h4>¿Cuénta con punto de venta?</h4>
                <input
                  className={s.inputCheck}
                  type="checkbox"
                  name="pointOfSale"
                />
              </div>
              <div className={s.inputAddress}>
                <h4>Dirección</h4>
                <input
                className={s.input}
                  // className={`${s.input} ${!formData.pointOfSale ? s.inputDisabled : ''}`}
                  type="text"
                  name="street"
                />
                {/* {errors.street && <p className={s.error}>{errors.street}</p>} */}
              </div>
            </div>
            <div className={s.divBtn}>
              <button className={s.btnCancel} onClick={onClose}>Cancelar</button>
              <button className={s.btnForm} type='submit'>Guardar cambios</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
};


export default EditManufacturer;
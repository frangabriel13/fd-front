import s from './EditData.module.css';

const EditData = ({ dataUser = {}, onClose }) => {
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
            <h3>Editar Datos</h3>
            <p>Rellena los siguientes datos para que puedan ser usados al generar la orden.</p>
          </div>
          <form className={s.form}>
            <div className={s.divInputs}>
              <div className={s.divInput}>
                <h4>Nombre</h4>
                <input
                  className={s.input}
                  type="text"
                  id="name"
                  name="name"
                  value={dataUser.name || ""}
                />
              </div>
              <div className={s.divInput}>
                <h4>Número de teléfono</h4>
                <input 
                  className={s.input}
                  type="text" 
                  id="phone"
                  name="phone"
                  value={dataUser.phone || ""} 
                />
              </div>
            </div>
            <hr className={s.divider} />
            <div className={s.divBtn}>
              <button className={s.btnCancel}>Cancelar</button>
              <button className={s.btnForm} type='submit'>Guardar cambios</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
};


export default EditData;
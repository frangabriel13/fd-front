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
          </div>
          <form>
            <div className={s.divInput}>
              <label htmlFor="name">Nombre:</label>
              <input type="text" id="name" defaultValue={dataUser.name || ""} />
            </div>
            <div className={s.divInput}>
              <label htmlFor="phone">Teléfono:</label>
              <input type="tel" id="phone" defaultValue={dataUser.phone || ""} />
            </div>
            <button type="submit" className={s.btnSave}>Guardar</button>
          </form>
          <hr className={s.divider} />
          <div className={s.divBtn}>
            <button className={s.btnCancel} onClick={onClose}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  )
};


export default EditData;
import s from './SizeModal.module.css';

const SizeModal = () => {
  return (
    <div className={s.modal}>
      <div className={s.modalContent}>
        <div className={s.container}>
          <div className={s.divTitle}>
            <h3>Selecciona los talles</h3>
            <p>Selecciona los talles en el orden correcto (de menor a mayor)</p>
          </div>
          <div className={s.divList}></div>
        </div>
      </div>
    </div>
  )
};


export default SizeModal;
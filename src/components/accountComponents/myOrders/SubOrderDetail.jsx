import s from './SubOrderDetail.module.css';

const SubOrderDetail = ({ subOrder, onClose }) => {
  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  console.log(subOrder);
  return (
    <div className={s.modal} onClick={handleClickOutside}>
      <div className={s.modalContent}>
        <div className={s.container}>
          <div className={s.divTitle}>
            <h3>Detalle de la orden</h3>
          </div>
        </div>
      </div>
    </div>
  )
};


export default SubOrderDetail;
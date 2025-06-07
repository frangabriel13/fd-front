import s from './ModalCategory.module.css';

const ModalCategory = ({ categories, selected, onSelect, onClose }) => {
  return (
    <div className={s.modal}>
      <div className={s.modalContent}>
        <div className={s.container}>
          <div className={s.divTitle}>
            <h3 className={s.title}>Selecciona una categoría</h3>
          </div>
          <div className={s.divCategories}>
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`${s.categoryBtn} ${selected === cat.id ? s.selected : ''}`}
                onClick={() => onSelect(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <div className={s.divBtns}>
            <button className={s.btnCancel} onClick={onClose}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ModalCategory;
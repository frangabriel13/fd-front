import { useState, useEffect } from 'react';
import s from './SizeModal.module.css';

const SizeModal = ({ sizes, onClose, onSave, initialSelectedSizes }) => {
  const [selectedSizes, setSelectedSizes] = useState([]);
  console.log("Sizes in SizeModal:", initialSelectedSizes);

  useEffect(() => {
    setSelectedSizes(initialSelectedSizes);
  }, [initialSelectedSizes]);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const id = Number(value); // Convertir a número
    setSelectedSizes((prevSelectedSizes) =>
      checked ? [...prevSelectedSizes, id] : prevSelectedSizes.filter((item) => item !== id)
    );
  };

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSave = () => {
    onSave(selectedSizes);
    onClose();
  };

  return (
    <div className={s.modal} onClick={handleClickOutside}>
      <div className={s.modalContent}>
        <div className={s.container}>
          <div className={s.divTitle}>
            <h3>Selecciona los talles</h3>
            <p>Selecciona los talles en el orden correcto (de menor a mayor)</p>
          </div>
          <div className={s.divContent}>
            <div className={s.divLists}>
              <div className={s.list}>
                <h4>Numéricos</h4>
                <div className={s.largeList}>
                  {sizes.Numéricos && sizes.Numéricos.map((size, index) => (
                    <div className={s.divCheck} key={index}>
                      <input 
                        className={s.input} 
                        type="checkbox" 
                        id={`numeric-${index}`} 
                        name="numeric" 
                        value={size.id} 
                        onChange={handleCheckboxChange}
                        checked={selectedSizes.includes(size.id)}
                      />
                      <label className={s.label} htmlFor={`numeric-${index}`}>{size.name}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className={s.list}>
              <h4>Alfanuméricos</h4>
                {sizes.Alfanuméricos && sizes.Alfanuméricos.map((size, index) => (
                  <div className={s.divCheck} key={index}>
                    <input 
                      className={s.input} 
                      type="checkbox" 
                      id={`alphanumeric-${index}`} 
                      name="alphanumeric" 
                      value={size.id}
                      onChange={handleCheckboxChange}
                      checked={selectedSizes.includes(size.id)}
                    />
                    <label className={s.label} htmlFor={`alphanumeric-${index}`}>{size.name}</label>
                  </div>
                ))}
              </div>
              {/* <div className={s.list}>
                <h4>Calzado</h4>
                <div className={s.largeList}>
                  {sizes.Calzado && sizes.Calzado.map((size, index) => (
                    <div className={s.divCheck} key={index}>
                      <input 
                        className={s.input} 
                        type="checkbox" 
                        id={`shoe-${index}`} 
                        name="shoe" 
                        value={size.id}
                        onChange={handleCheckboxChange}
                        checked={selectedSizes.includes(size.id)}
                      />
                      <label className={s.label} htmlFor={`shoe-${index}`}>{size.name}</label>
                    </div>
                  ))}
                </div>
              </div> */}
            </div>
          </div>
          <hr className={s.divider} />
          <div className={s.divBtn}>
            <button className={s.btnCancel} onClick={onClose}>Cerrar</button>
            <button className={s.btnNext} type='button' onClick={handleSave}>Aceptar</button>
          </div>
        </div>
      </div>
    </div>
  )
};


export default SizeModal;
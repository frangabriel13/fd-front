import { useState, useEffect } from 'react';
import s from './ColorModal.module.css';

const ColorModal = ({ onClose, onSave, colors, initialSelectedColors }) => {
  const [selectedColors, setSelectedColors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  console.log('selectedColors', selectedColors);

  console.log(colors);

  useEffect(() => {
    setSelectedColors(initialSelectedColors);
  }, [initialSelectedColors]);

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSave = () => {
    const selectedColorIds = selectedColors.map(color => color.id);
    onSave(selectedColorIds);
    onClose();
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleColorClick = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter(c => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const filteredColors = colors.filter(color => color.name.toLowerCase().includes(searchTerm.toLowerCase()));
  
  return (
    <div className={s.modal} onClick={handleClickOutside}>
      <div className={s.modalContent}>
        <div className={s.container}>
          <div className={s.divTitle}>
            <h3>Selecciona los colores</h3>
            <p>Selecciona todas las variantes de colores que tenga tu producto</p>
          </div>
          <div className={s.divContent}>
            <input 
              type="text" 
              placeholder="Buscar colores..." 
              value={searchTerm} 
              onChange={handleSearchChange} 
              className={s.searchInput}
            />
            <div className={s.colorsList}>
              {filteredColors.map(color => (
                <div 
                  key={color.id} 
                  className={`${s.colorItem} ${selectedColors.includes(color.id) ? s.selected : ''}`} 
                  onClick={() => handleColorClick(color)}
                  style={{ borderBottom: `5px solid ${color.code}` }}
                >
                  {color.name}
                </div>
              ))}
            </div>
            <div className={s.selectedColors}>
              <h4>Colores seleccionados:</h4>
              <div className={s.colorsList}>
                {selectedColors.map(color => (
                  <div 
                    key={color.id} 
                    className={s.selectedColorItem} 
                    onClick={() => handleColorClick(color)}
                    style={{ borderBottom: `5px solid ${color.code}` }}
                  >
                    {color.name}
                  </div>
                ))}
              </div>
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


export default ColorModal;
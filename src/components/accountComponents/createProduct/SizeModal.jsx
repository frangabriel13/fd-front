import s from './SizeModal.module.css';

const SizeModal = ({ sizes }) => {
  return (
    <div className={s.modal}>
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
                      <input className={s.input} type="checkbox" id={`numeric-${index}`} name="numeric" value={size} />
                      <label className={s.label} htmlFor={`numeric-${index}`}>{size.name}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className={s.list}>
              <h4>Alfanuméricos</h4>
                {sizes.Alfanuméricos && sizes.Alfanuméricos.map((size, index) => (
                  <div className={s.divCheck} key={index}>
                    <input className={s.input} type="checkbox" id={`alphanumeric-${index}`} name="alphanumeric" value={size} />
                    <label className={s.label} htmlFor={`alphanumeric-${index}`}>{size.name}</label>
                  </div>
                ))}
              </div>
              <div className={s.list}>
                <h4>Calzado</h4>
                <div className={s.largeList}>
                  {sizes.Calzado && sizes.Calzado.map((size, index) => (
                    <div className={s.divCheck} key={index}>
                      <input className={s.input} type="checkbox" id={`shoe-${index}`} name="shoe" value={size} />
                      <label className={s.label} htmlFor={`shoe-${index}`}>{size.name}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <hr className={s.divider} />
          <div className={s.divBtn}>
            <button className={s.btnNext} type='submit'>Siguiente</button>
          </div>
        </div>
      </div>
    </div>
  )
};


export default SizeModal;
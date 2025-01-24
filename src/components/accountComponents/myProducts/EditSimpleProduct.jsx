import s from './EditSimpleProduct.module.css';

const EditSimpleProduct = ({ product, handleEdit, closeModal }) => {
  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className={s.modal} onClick={handleClickOutside}>
      <div className={s.modalContent}>
        <div className={s.container}>
          <div className={s.divTitle}>
            <h3>Editar Producto</h3>
            <p>Completa los campos para editar el producto</p>
          </div>
          <form className={s.form}>
            <div className={s.divForm}>
              <div className={s.divInputs}>
                <div className={s.divInput}>
                  <h4 className={s.label}>Nombre</h4>
                  <input
                    className={s.input}
                    type="text"
                    name="name"
                  />
                </div>
                <div className={s.divInput}>
                  <h4 className={s.label}>Precio</h4>
                  <input
                    className={s.input}
                    type="number"
                    name="price"
                  />
                </div>
              </div>
              <div className={s.divDescription}>
                <h4 className={s.label}>Descripción</h4>
                <textarea
                  className={s.textarea}
                  name="description"
                />
              </div>
              <div className={s.divInputsTwo}>
                <div className={s.divTags}>
                  <h4 className={s.label}>Etiquetas</h4>
                  <div className={s.tagsContainer}>
                    <div className={s.tagContainer}>
                      <input
                        className={s.inputTag}
                        type="text"
                        name="tagInput"
                      />
                      <button className={s.btnAddTag}>Agregar</button>
                    </div>
                    <div className={s.tags}>
                      {product.tags.map((tag, index) => (
                        <span key={index} className={s.tag}>
                          {tag}
                          <button className={s.btnRemoveTag}>x</button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={s.divSubInputs}>
                  <div className={s.divCategories}>
                    <h4>Talles</h4>
                    <div>
                      <button type="button">Editar talles</button>
                    </div>
                  </div>
                  <div className={s.divCategories}>
                    <h4>Imágenes</h4>
                    <div>
                      <button type="button">Editar imágenes</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr className={s.divider} />
            <div className={s.divBtn}>
              <button className={s.btnCancel} onClick={closeModal}>Cerrar</button>
              <button className={s.btnNext} type='submit'>Guardar cambios</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


export default EditSimpleProduct;
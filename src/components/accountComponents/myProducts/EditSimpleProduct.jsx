import { useState } from 'react';
import s from './EditSimpleProduct.module.css';

const EditSimpleProduct = ({ product, handleEdit, closeModal }) => {
  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price,
    description: product.description,
    tags: product.tags,

    isVariable: product.isVariable,
    mainImage: product.mainImage,
    images: product.images,
    sizes: product.sizes,
  });

  console.log('formData', formData);

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEdit(formData);
    closeModal();
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
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className={s.divInput}>
                  <h4 className={s.label}>Precio</h4>
                  <input
                    className={s.input}
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className={s.divDescription}>
                <h4 className={s.label}>Descripción</h4>
                <textarea
                  className={s.textarea}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
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
                      {formData.tags.map((tag, index) => (
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
              <button className={s.btnNext} type='submit'>Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


export default EditSimpleProduct;
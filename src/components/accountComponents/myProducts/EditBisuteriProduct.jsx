import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../../../store/actions/productActions';
import s from './EditSimpleProduct.module.css';

const EditBisuteriProduct = ({ product, closeModal }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price,
    description: product.description,
    tags: product.tags,
  });
  const [tagInput, setTagInput] = useState('');

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

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() !== '') {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (index) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct(product.id, formData));
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
          <form className={s.form} onSubmit={handleSubmit}>
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
                        value={tagInput}
                        onChange={handleTagInputChange}
                      />
                      <button className={s.btnAddTag} onClick={handleAddTag}>Agregar</button>
                    </div>
                    <div className={s.tags}>
                      {formData.tags.map((tag, index) => (
                        <span key={index} className={s.tag}>
                          {tag}
                          <button className={s.btnRemoveTag} onClick={() => handleRemoveTag(index)}>x</button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={s.divSubInputs}>
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


export default EditBisuteriProduct;
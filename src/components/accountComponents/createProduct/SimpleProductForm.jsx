import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../../../store/actions/productActions';
import s from './SimpleProductForm.module.css';

const SimpleProductForm = ({ productType, genderProduct, selectedCategory }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    tags: [],
    mainImage: '',
    images: [],
    sizes: [],
  });
  const [tagInput, setTagInput] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTagChange = (e) => {
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
    const productData = {
      ...formData,
      type: productType,
      genderProduct,
      categoryId: selectedCategory,
    };
    dispatch(createProduct(productData));
  };
  
  return (
    <div className={s.container}>
      <div className={s.divTitle}>
        <h3>Completa el formulario</h3>
        <p>Rellena el siguiente formulario para terminar de crear tu producto</p>
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
          <div className={s.divTags}>
            <h4 className={s.label}>Etiquetas</h4>
            <div className={s.tagsContainer}>
              <div className={s.tagContainer}>
                <input
                  className={s.inputTag}
                  type="text"
                  name="tagInput"
                  value={tagInput}
                  onChange={handleTagChange}
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
        </div>
        <div className={s.divBtn}>
          <button className={s.btnForm} type='submit'>Siguiente</button>
        </div>
      </form>
    </div>
  )
}


export default SimpleProductForm;
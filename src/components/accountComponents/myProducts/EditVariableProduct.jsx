import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct } from '../../../store/actions/productActions';
import s from './EditSimpleProduct.module.css';
import ColorModal from '../createProduct/ColorModal';

const EditVariableProduct = ({ product, closeModal }) => {
  const dispatch = useDispatch();
  const colors = useSelector((state) => state.color.colors);
  const [formData, setFormData] = useState({
    name: product.name,
    price: Number(product.price),
    description: product.description,
    tags: product.tags,
    priceUSD: Number(product.priceUSD),
    onSale: product.onSale,
    colors: product.colors || [],
    isVariable: product.isVariable,
    sizes: product.sizes || [],
  });
  const [tagInput, setTagInput] = useState('');
  const [showColorModal, setShowColorModal] = useState(false);

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : (name === 'price' || name === 'priceUSD' ? parseFloat(value) : value),
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

  const handleRemoveTag = (index, e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      tags: formData.tags.filter((_, i) => i !== index),
    });
  };

  const handleShowColorModal = () => setShowColorModal(true);
  const handleHideColorModal = () => setShowColorModal(false);
  const handleSaveColors = (selectedColors) => {
    setFormData({
      ...formData,
      colors: selectedColors,
    });
    setShowColorModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct(product.id, formData));
    closeModal();
  };

  console.log("Form Data in EditVariableProduct:", formData);


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
                <div className={s.divPrices}>
                  <div className={s.divInput}>
                    <h4 className={s.label}>Precio</h4>
                    <input
                      className={s.inputPrice}
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={s.divInput}>
                    <h4 className={s.label}>Precio en USD</h4>
                    <input
                      className={s.inputPrice}
                      type="number"
                      name="priceUSD"
                      value={formData.priceUSD}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className={s.divCheckbox}>
                <input
                  type="checkbox"
                  name="onSale"
                  checked={formData.onSale}
                  onChange={handleChange}
                  />
                <label>
                  Marcar ésta casilla si el producto se encuentra en oferta o liquidación
                </label>
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
                          <button className={s.btnRemoveTag} onClick={(e) => handleRemoveTag(index, e)}>x</button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={s.divSubInputs}>
                  <div className={s.divCategories}>
                    <h4>Colores</h4>
                    <div>
                      <button type="button" onClick={handleShowColorModal}>Editar colores</button>
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
      {showColorModal && (
        <ColorModal
          onClose={handleHideColorModal}
          colors={colors}
          onSave={handleSaveColors}
          initialSelectedColors={formData.colors}
        />
      )}
    </div>
  );
};


export default EditVariableProduct;
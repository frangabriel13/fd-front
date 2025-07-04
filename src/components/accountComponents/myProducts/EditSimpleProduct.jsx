import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../../../store/actions/productActions';
import s from './EditSimpleProduct.module.css';
import SizeModal from '../createProduct/SizeModal';
import ImageModal from '../createProduct/ImageModal';

const EditSimpleProduct = ({ product, closeModal, sizes }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price,
    description: product.description,
    tags: product.tags,
    priceUSD: product.priceUSD,
    onSale: product.onSale,
    isVariable: product.isVariable,
    mainImage: product.mainImage,
    images: product.images,
    imgIds: [],
    sizes: product.sizes || [],
  });
  const [tagInput, setTagInput] = useState('');
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

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

  const handleShowSizeModal = () => setShowSizeModal(true);
  const handleHideSizeModal = () => setShowSizeModal(false);

   const handleSaveSizes = (selectedSizes) => {
    setFormData({
      ...formData,
      sizes: selectedSizes,
    });
    setShowSizeModal(false);
  };

  const handleShowImageModal = () => setShowImageModal(true);
  const handleHideImageModal = () => setShowImageModal(false);

  const handleSaveImages = (selectedImages, mainImage, imgIds) => {
    setFormData({
      ...formData,
      images: selectedImages,
      mainImage: mainImage,
      imgIds: imgIds,
    });
    setShowImageModal(false);
  };

  console.log('Form Data:', formData);

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
                          <button type="button" className={s.btnRemoveTag} onClick={() => handleRemoveTag(index)}>x</button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={s.divSubInputs}>
                  <div className={s.divCategories}>
                    <h4>Talles</h4>
                    <div>
                      <button type="button" onClick={handleShowSizeModal}>Editar talles</button>
                    </div>
                  </div>
                  <div className={s.divCategories}>
                    <h4>Imágenes</h4>
                    <div>
                      <button type="button" onClick={handleShowImageModal}>Editar imágenes</button>
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
      {showSizeModal && (
        <SizeModal
          onClose={handleHideSizeModal}
          sizes={sizes}
          onSave={handleSaveSizes}
          initialSelectedSizes={formData.sizes}
        />
      )}
      {showImageModal && (
        <ImageModal
          onClose={handleHideImageModal}
          onSave={handleSaveImages}
        />
      )}
    </div>
  );
};


export default EditSimpleProduct;
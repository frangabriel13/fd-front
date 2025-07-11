import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../../../store/actions/productActions';
import s from './SimpleProductForm.module.css';
import ImageModal from './ImageModal';
import { createBisuteriProductValidator } from '../../../utils/validations';

const BisuteriProductForm = ({ productType, genderProduct, selectedCategory, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    priceUSD: '',
    tags: [],
    mainImage: '',
    images: [],
    imgIds: [],
    sizes: [19],
    onSale: false,
  });
  const [tagInput, setTagInput] = useState('');
  const [showImageModal, setShowImageModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
 
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : (name === 'price' || name === 'priceUSD' ? parseFloat(value) : value),
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
    const validationErrors = createBisuteriProductValidator(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    const productData = {
      ...formData,
      type: productType,
      genderId: genderProduct,
      categoryId: parseInt(selectedCategory, 10),
    };

    setErrors({});
    console.log('Datos del producto:', productData);
    dispatch(createProduct(productData)).then(() => {
      setLoading(false); // <-- desactivar loading al terminar
      onSuccess();
      onClose();
    }).catch(() => {
      setLoading(false); // <-- desactivar loading si hay error
    });
  };

  const handleShowImageModal = () => {
    setShowImageModal(true);
  };

  const handleHideImageModal = () => {
    setShowImageModal(false);
  };

  const handleSaveImages = (selectedImages, mainImage, imgIds) => {
    setFormData({
      ...formData,
      images: selectedImages,
      mainImage: mainImage,
      imgIds: imgIds,
    });
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
              {errors.name && <p className={s.error}>{errors.name}</p>}
            </div>
            <div className={s.divPrices}>
              <div className={s.divInput}>
                <h4 className={s.label}>Precio</h4>
                <input
                  className={s.input}
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
                {errors.price && <p className={s.error}>{errors.price}</p>}
              </div>
              <div className={s.divInput}>
                <h4 className={s.label}>Precio en USD</h4>
                <input
                  className={s.input}
                  type="number"
                  name="priceUSD"
                  value={formData.priceUSD}
                  onChange={handleChange}
                />
                {errors.priceUSD && <p className={s.error}>{errors.priceUSD}</p>}
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
            {errors.description && <p className={s.error}>{errors.description}</p>}
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
              {errors.tags && <p className={s.error}>{errors.tags}</p>}
            </div>
            <div className={s.divSubInputs}>
              <div className={s.divCategories}>
                <h4>Imágenes</h4>
                <div>
                  <button type="button" onClick={handleShowImageModal}>Editar imágenes</button>
                </div>
                {formData.images.length > 0 && (
                  <div className={s.selectedImagesPreview}>
                    <h5>Imágenes seleccionadas:</h5>
                    <div className={s.imagesPreviewList}>
                      {formData.images.map((imageUrl, index) => (
                        <div 
                          key={index} 
                          className={`${s.imagePreviewItem} ${formData.mainImage === imageUrl ? s.mainImagePreview : ''}`}
                        >
                          <img 
                            src={imageUrl} 
                            alt={`Imagen ${index + 1}`} 
                            className={s.previewImage} 
                          />
                          {formData.mainImage === imageUrl && (
                            <span className={s.mainImageLabel}>Principal</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {errors.images && <p className={s.error}>{errors.images}</p>}
              </div>
            </div>
          </div>
        </div>
        <hr className={s.divider} />
        <div className={s.divBtn}>
          <button className={s.btnNext} type='submit' disabled={loading}>
            {loading ? 'Creando producto...' : 'Crear producto'}
          </button>
        </div>
        {loading && <p style={{ textAlign: 'center', color: '#888' }}>Creando producto...</p>}
      </form>
      {showImageModal && 
        <ImageModal 
          onClose={handleHideImageModal}
          onSave={handleSaveImages}
        />}
    </div>
  )
}


export default BisuteriProductForm;
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../../../store/actions/productActions';
import s from './SimpleProductForm.module.css';
import ImageModal from './ImageModal';

const BisuteriProductForm = ({ productType, genderProduct, selectedCategory }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    tags: [],
    mainImage: '',
    images: [],
    imgIds: [],
    sizes: [19],
  });
  const [tagInput, setTagInput] = useState('');
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  console.log('formData', formData);
 
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
      genderId: genderProduct,
      categoryId: parseInt(selectedCategory, 10),
    };
    dispatch(createProduct(productData));
  };

  const handleShowSizeModal = () => {
    setShowSizeModal(true);
  };

  const handleHideSizeModal = () => {
    setShowSizeModal(false);
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
            <div className={s.divSubInputs}>
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
          <button className={s.btnNext} type='submit'>Crear producto</button>
        </div>
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
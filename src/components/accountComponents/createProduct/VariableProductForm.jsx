import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../../../store/actions/productActions';
import { getColors } from '../../../store/actions/colorActions';
import s from './SimpleProductForm.module.css';
import ImageModal from './ImageModal';
import ColorModal from './ColorModal';
import { createVariableProductValidator } from '../../../utils/validations';

const SimpleProductForm = ({ productType, genderProduct, selectedCategory }) => {
  const dispatch = useDispatch();
  const colors = useSelector((state) => state.color.colors);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    tags: [],
    mainImage: '',
    images: [],
    imgIds: [],
    sizes: [19],
    colors: [],
    isVariable: true,
  });
  const [tagInput, setTagInput] = useState('');
  const [showColorModal, setShowColorModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getColors());
  }, [dispatch]);
 
  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' ? parseFloat(value) : value,
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
    const validationErrors = createVariableProductValidator(formData);
    if(Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const variations = formData.colors.map((color) => ({
      colorId: color.id,
      mainImage: formData.mainImage,
      images: formData.images,
    }));

    const productData = {
      ...formData,
      type: productType,
      genderId: genderProduct,
      categoryId: parseInt(selectedCategory, 10),
      variations,
    };

    setErrors({});
    dispatch(createProduct(productData));
  };

  const handleShowColorModal = () => {
    setShowColorModal(true);
  };

  const handleHideColorModal = () => {
    setShowColorModal(false);
  };

  const handleSaveColors = (selectedColors) => {
    setFormData({
      ...formData,
      colors: selectedColors,
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
                <h4>Colores</h4>
                <div>
                  <button type="button" onClick={handleShowColorModal}>Editar colores</button>
                </div>
                {errors.colors && <p className={s.error}>{errors.colors}</p>}
              </div>
              <div className={s.divCategories}>
                <h4>Imágenes</h4>
                <div>
                  <button type="button" onClick={handleShowImageModal}>Editar imágenes</button>
                </div>
                {errors.images && <p className={s.error}>{errors.images}</p>}
              </div>
            </div>
          </div>
        </div>
        <hr className={s.divider} />
        <div className={s.divBtn}>
          <button className={s.btnNext} type='submit'>Crear producto</button>
        </div>
      </form>
      {showColorModal &&
        <ColorModal 
          onClose={handleHideColorModal} 
          colors={colors} 
          onSave={handleSaveColors}
          initialSelectedColors={formData.colors}
        />}
      {showImageModal && 
        <ImageModal 
          onClose={handleHideImageModal}
          onSave={handleSaveImages}
        />}
    </div>
  )
}


export default SimpleProductForm;
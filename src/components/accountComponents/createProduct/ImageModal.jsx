import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImages } from '../../../store/actions/imageAction';
import s from './ImageModal.module.css';

const ImageModal = ({ onClose, onSave }) => {
  const dispatch = useDispatch();
  const { images } = useSelector((state) => state.image);
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    if (images) {
      setUploadedImages(images);
    }
  }, [images]);

  console.log('images', images);
  console.log('uploadedImages', uploadedImages);

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 3) {
      alert('Solo puedes seleccionar hasta tres imágenes');
      return;
    }
    setSelectedImages(Array.from(e.target.files));
  };

  const handleUpload = () => {
    const formData = new FormData();
    selectedImages.forEach((image) => {
      formData.append('images', image);
    });
    dispatch(uploadImages(formData));
  };

  const handleSelectMainImage = (imageId) => {
    setMainImage(imageId);
  };

  const handleAccept = () => {
    const imageUrls = uploadedImages.map(image => image.url);
    const mainImageUrl = uploadedImages.find(image => image.id === mainImage)?.url || '';
    onSave(imageUrls, mainImageUrl);
    onClose();
  };

  return (
    <div className={s.modal} onClick={handleClickOutside}>
      <div className={s.modalContent}>
        <div className={s.container}>
          <div className={s.divTitle}>
            <h3>Selecciona las imágenes</h3>
            <p>Selecciona hasta tres imágenes (recomendamos la medida de 900x1200)</p>
          </div>
          <div className={s.divImages}>
            <input className={s.inputFile} type="file" multiple onChange={handleImageChange} />
            <button className={s.btnNext} type='button' onClick={handleUpload}>Subir imágenes</button>
          </div>
          <div className={s.uploadImages}>
            <div className={s.divMainImage}>
              <h4>Elige la imagen principal</h4>
              <p>La imagen seleccionada será la de portada de tu producto</p>
            </div>
            <div className={s.mapImages}>
              {uploadedImages && uploadedImages.map((image, index) => (
                <div 
                  key={index} 
                  className={`${s.uploadedImageContainer} ${mainImage === image.id ? s.mainImageSelected : ''}`}
                  onClick={() => handleSelectMainImage(image.id)}
                >
                  <img 
                    src={image.url} 
                    alt={`uploaded ${index}`} 
                    className={s.uploadedImage} 
                  />
                </div>
              ))}
            </div>
          </div>
          <hr className={s.divider} />
          <div className={s.divBtn}>
            <button className={s.btnCancel} onClick={onClose}>Cerrar</button>
            <button className={s.btnNext} type='button' onClick={handleAccept}>Aceptar</button>
          </div>
        </div>
      </div>
    </div>
  )
};


export default ImageModal;
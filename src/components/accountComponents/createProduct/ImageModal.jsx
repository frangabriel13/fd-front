import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadImages } from '../../../store/actions/imageAction';
import s from './ImageModal.module.css';

const ImageModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const [selectedImages, setSelectedImages] = useState([]);

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
    onClose();
  };

  return (
    <div className={s.modal} onClick={handleClickOutside}>
      <div className={s.modalContent}>
        <div className={s.container}>
          <div className={s.divTitle}>
            <h3>Selecciona las imágenes</h3>
            <p>Selecciona las tres imágenes que mejor representen a tu producto</p>
          </div>
          <div className={s.divImages}>
            <input className={s.inputFile} type="file" multiple onChange={handleImageChange} />
            <button className={s.btnNext} type='button' onClick={uploadImages}>Subir imágenes</button>
          </div>
          <hr className={s.divider} />
          <div className={s.divBtn}>
            <button className={s.btnCancel} onClick={onClose}>Cerrar</button>
            <button className={s.btnNext} type='button'>Aceptar</button>
          </div>
        </div>
      </div>
    </div>
  )
};


export default ImageModal;
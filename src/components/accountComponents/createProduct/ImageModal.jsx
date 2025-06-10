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
  const [isUploadDisabled, setIsUploadDisabled] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (images) {
      setUploadedImages(images);
    }
  }, [images]);

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 3) {
      alert('Solo puedes seleccionar hasta tres imágenes');
      setIsUploadDisabled(true);
      return;
    }
    setSelectedImages(Array.from(e.target.files));
    setIsUploadDisabled(false);
  };

  const resizeImageCover = (file, targetWidth = 900, targetHeight = 1200) => {
    return new Promise((resolve) => {
      const img = new window.Image();
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target.result;
      };
      img.onload = () => {
        const aspectRatio = targetWidth / targetHeight;
        let cropWidth = img.width;
        let cropHeight = img.height;
        let offsetX = 0;
        let offsetY = 0;

        if (img.width / img.height > aspectRatio) {
          cropWidth = img.height * aspectRatio;
          offsetX = (img.width - cropWidth) / 2;
        } else {
          cropHeight = img.width / aspectRatio;
          offsetY = (img.height - cropHeight) / 2;
        }

        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(
          img,
          offsetX, offsetY, cropWidth, cropHeight,
          0, 0, targetWidth, targetHeight
        );
        canvas.toBlob((blob) => {
          resolve(new File([blob], file.name, { type: file.type }));
        }, file.type, 0.9);
      };
      reader.readAsDataURL(file);
    });
  };

  // const handleUpload = () => {
  //   const formData = new FormData();
  //   selectedImages.forEach((image) => {
  //     formData.append('images', image);
  //   });
  //   dispatch(uploadImages(formData));
  // };
  const handleUpload = async () => {
    setIsUploading(true);
    const formData = new FormData();
    for (const image of selectedImages) {
      const resized = await resizeImageCover(image);
      formData.append('images', resized);
    }
    await dispatch(uploadImages(formData));
    setIsUploading(false);
  };

  const handleSelectMainImage = (imageId) => {
    setMainImage(imageId);
  };

  const handleAccept = () => {
    const imageUrls = uploadedImages.map(image => image.url);
    const mainImageUrl = uploadedImages.find(image => image.id === mainImage)?.url || '';
    const imgIds = uploadedImages.map(image => image.id);
    onSave(imageUrls, mainImageUrl, imgIds);
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
            {/* <button 
              className={`${s.btnNext} ${isUploadDisabled ? s.btnDisabled : ''}`}
              type='button' 
              onClick={handleUpload} 
              disabled={isUploadDisabled}
            >
              Subir imágenes
            </button> */}
            <button 
              className={`${s.btnNext} ${(isUploadDisabled || isUploading) ? s.btnDisabled : ''}`}
              type='button' 
              onClick={handleUpload} 
              disabled={isUploadDisabled || isUploading}
            >
              {isUploading ? 'Subiendo imágenes...' : 'Subir imágenes'}
            </button>
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
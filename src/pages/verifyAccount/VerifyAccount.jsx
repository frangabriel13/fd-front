import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadManufacturerImages } from '../../store/actions/manufacturerActions';
// import { getMe } from '../../store/actions/userActions';
import s from './VerifyAccount.module.css';

const VerifyAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { loading, error, uploadedImages } = useSelector((state) => state.manufacturer);
  const [images, setImages] = useState({
    selfie: null,
    dniFront: null,
    dniBack: null,
  });
  const [successMessage, setSuccessMessage] = useState('');

  const resizeImage = (file, maxWidth = 800, maxHeight = 800) => {
    return new Promise((resolve) => {
      const img = new window.Image();
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target.result;
      };
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height *= maxWidth / width));
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width *= maxHeight / height));
              height = maxHeight;
            }
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob((blob) => {
          resolve(new File([blob], file.name, { type: file.type }));
        }, file.type, 0.8);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    if (files[0]) {
      const resizedFile = await resizeImage(files[0]);
      setImages((prevImages) => ({
        ...prevImages,
        [name]: resizedFile,
      }));
    }
  };

  // const handleFileChange = (e) => {
  //   const { name, files } = e.target;
  //   setImages((prevImages) => ({
  //     ...prevImages,
  //     [name]: files[0],
  //   }));
  // };

  const handleUpload = async () => {
    const formData = new FormData();
    Object.keys(images).forEach((key) => {
      formData.append(key, images[key]);
    });

    try {
      await dispatch(uploadManufacturerImages(user.manufacturer.id, formData));
      setSuccessMessage('Imágenes subidas correctamente');
      // dispatch(getMe());
      setTimeout(() => {
        navigate('/mi-cuenta');
      }, 1000);
    } catch(error) {
      console.error('Error al subir imágenes:', error);
      setSuccessMessage('');
    }
  };

  const isDisabled = !images.selfie || !images.dniFront || !images.dniBack;

  return (
    <div className={s.container}>
      {user.manufacturer.verificationStatus === 'pending' ? (
        <div className={s.divVerifyAccount}>
          <div className={s.divHeader}>
            <h2>Verificación pendiente</h2>
            <p>Su cuenta se encuentra en proceso de verificación. Un asesor analizará los datos a la brevedad.</p>
          </div>
        </div>
      ) : user.manufacturer.verificationStatus === 'verified' ? (
        <div className={s.divVerifyAccount}>
          <div className={s.divHeader}>
            <h2>Verificación completada</h2>
            <p>Su cuenta ha sido verificada con éxito. Ya puede comenzar a utilizar todas las funcionalidades de la plataforma.</p>
          </div>
        </div>
      ) : user.manufacturer.verificationStatus === 'not_started' && (
        <div className={s.divVerifyAccount}>
          <div className={s.divHeader}>
            <h2>Verificar cuenta</h2>
            <p>Su cuenta ha sido registrada con éxito. Ahora solo falta verificar su cuenta con una selfie y la imagen del dni (frente y reverso).</p>
          </div>
          <div className={s.divImages}>
            <div className={s.divImage}>
              <h4>Selfie:</h4>
              <input 
                type="file" 
                name="selfie" 
                className={s.input} 
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
            <div className={s.divImage}>
              <h4>DNI Frente:</h4>
              <input 
                type="file" 
                name="dniFront" 
                className={s.input} 
                onChange={handleFileChange}
                accept="image/*" 
              />
            </div>
            <div className={s.divImage}>
              <h4>DNI Reverso:</h4>
              <input 
                type="file" 
                name="dniBack" 
                className={s.input} 
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
          </div>
          <div className={s.divbtn}>
            <button 
              onClick={handleUpload}
              className={isDisabled ? `${s.btnForm} ${s.btnFormDisabled}` : s.btnForm} 
              disabled={isDisabled}
            >
              Subir Imágenes
            </button>
          </div>
          {successMessage && <p className={s.successMessage}>{successMessage}</p>}
        </div>
      )}
    </div>
  )
};


export default VerifyAccount;
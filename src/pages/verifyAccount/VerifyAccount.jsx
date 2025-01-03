import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { uploadManufacturerImages } from '../../store/actions/manufacturerActions';
import s from './VerifyAccount.module.css';

const VerifyAccount = () => {
  const dispatch = useDispatch();
  const { loading, error, uploadedImages } = useSelector((state) => state.manufacturer);
  const [images, setImages] = useState({
    selfie: null,
    dniFront: null,
    dniBack: null,
  });

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setImages((prevImages) => ({
      ...prevImages,
      [name]: files[0],
    }));
  };

  const handleUpload = () => {
    const formData = new FormData();
    Object.keys(images).forEach((key) => {
      formData.append(key, images[key]);
    });
    dispatch(uploadManufacturerImages(manufacturerId, formData));
  };

  const isDisabled = !images.selfie || !images.dniFront || !images.dniBack;

  return (
    <div className={s.container}>
      <div className={s.divVerifyAccount}>
        <div className={s.divHeader}>
          <h2>Verificar cuenta</h2>
          <p>Su cuenta ha sido registrada con éxito. Ahora solo falta verificar su cuenta con una selfie y la imagen del dni (frente y reverso).</p>
        </div>
        <div className={s.divImages}>
          <div className={s.divImage}>
            <h4>Selfie:</h4>
            <input type="file" name="selfie" className={s.input} onChange={handleFileChange} />
          </div>
          <div className={s.divImage}>
            <h4>DNI Frente:</h4>
            <input type="file" name="dniFront" className={s.input} onChange={handleFileChange} />
          </div>
          <div className={s.divImage}>
            <h4>DNI Reverso:</h4>
            <input type="file" name="dniBack" className={s.input} onChange={handleFileChange} />
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
      </div>
    </div>
  )
};


export default VerifyAccount;
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

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setImages((prevImages) => ({
      ...prevImages,
      [name]: files[0],
    }));
  };

  const handleUpload = async () => {
    console.log('state images:', images);

    const formData = new FormData();
    Object.keys(images).forEach((key) => {
      formData.append(key, images[key]);
    });

    for (let pair of formData.entries()) {
      console.log('FORMDATA ENTRY:', pair[0], pair[1]);
    }

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




// import { useDispatch, useSelector } from 'react-redux';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { uploadManufacturerImages } from '../../store/actions/manufacturerActions';
// import s from './VerifyAccount.module.css';

// const VerifyAccount = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.user);
//   const { loading, error, uploadedImages } = useSelector((state) => state.manufacturer);
//   const [images, setImages] = useState({
//     selfie: null,
//     dniFront: null,
//     dniBack: null,
//   });
//   const [successMessage, setSuccessMessage] = useState('');

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setImages((prevImages) => ({
//       ...prevImages,
//       [name]: files[0],
//     }));
//   };

//   const handleUpload = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     if (images.selfie) formData.append('selfie', images.selfie);
//     if (images.dniFront) formData.append('dniFront', images.dniFront);
//     if (images.dniBack) formData.append('dniBack', images.dniBack);

//     try {
//       await dispatch(uploadManufacturerImages(user.manufacturer.id, formData));
//       setSuccessMessage('Imágenes subidas correctamente');
//       setTimeout(() => {
//         navigate('/mi-cuenta');
//       }, 1000);
//     } catch (error) {
//       console.error('Error al subir imágenes:', error);
//       setSuccessMessage('');
//     }
//   };

//   const isDisabled = !images.selfie || !images.dniFront || !images.dniBack;

//   return (
//     <div className={s.container}>
//       {user.manufacturer.verificationStatus === 'pending' ? (
//         <div className={s.divVerifyAccount}>
//           <div className={s.divHeader}>
//             <h2>Verificación pendiente</h2>
//             <p>Su cuenta se encuentra en proceso de verificación. Un asesor analizará los datos a la brevedad.</p>
//           </div>
//         </div>
//       ) : user.manufacturer.verificationStatus === 'verified' ? (
//         <div className={s.divVerifyAccount}>
//           <div className={s.divHeader}>
//             <h2>Verificación completada</h2>
//             <p>Su cuenta ha sido verificada con éxito. Ya puede comenzar a utilizar todas las funcionalidades de la plataforma.</p>
//           </div>
//         </div>
//       ) : user.manufacturer.verificationStatus === 'not_started' && (
//         <form onSubmit={handleUpload} className={s.divVerifyAccount}>
//           <div className={s.divHeader}>
//             <h2>Verificar cuenta</h2>
//             <p>Su cuenta ha sido registrada con éxito. Ahora solo falta verificar su cuenta con una selfie y la imagen del dni (frente y reverso).</p>
//           </div>
//           <div className={s.divImages}>
//             <div className={s.divImage}>
//               <h4>Selfie:</h4>
//               <input 
//                 type="file" 
//                 name="selfie" 
//                 className={s.input} 
//                 onChange={handleFileChange}
//                 accept="image/*"
//               />
//               {images.selfie && <span>Archivo: {images.selfie.name}</span>}
//             </div>
//             <div className={s.divImage}>
//               <h4>DNI Frente:</h4>
//               <input 
//                 type="file" 
//                 name="dniFront" 
//                 className={s.input} 
//                 onChange={handleFileChange}
//                 accept="image/*" 
//               />
//               {images.dniFront && <span>Archivo: {images.dniFront.name}</span>}
//             </div>
//             <div className={s.divImage}>
//               <h4>DNI Reverso:</h4>
//               <input 
//                 type="file" 
//                 name="dniBack" 
//                 className={s.input} 
//                 onChange={handleFileChange}
//                 accept="image/*"
//               />
//               {images.dniBack && <span>Archivo: {images.dniBack.name}</span>}
//             </div>
//           </div>
//           <div className={s.divbtn}>
//             <button
//               type="submit"
//               className={isDisabled ? `${s.btnForm} ${s.btnFormDisabled}` : s.btnForm}
//               disabled={isDisabled}
//             >
//               Subir Imágenes
//             </button>
//           </div>
//           {successMessage && <p className={s.successMessage}>{successMessage}</p>}
//         </form>
//       )}
//     </div>
//   );
// };

// export default VerifyAccount;
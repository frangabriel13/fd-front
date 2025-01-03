import { useDispatch, useSelector } from 'react-redux';
import { uploadManufacturerImages } from '../../store/actions/manufacturerActions';
import s from './VerifyAccount.module.css';

const VerifyAccount = () => {
  const dispatch = useDispatch();
  const { loading, error, uploadedImages } = useSelector((state) => state.manufacturer);

  const handleUpload = (e) => {
    const formData = new FormData();
    for (let i = 0; i < event.target.files.length; i++) {
      formData.append('files', event.target.files[i]);
    }
    dispatch(uploadManufacturerImages(manufacturerId, formData));
  };

  return (
    <div className={s.container}>
      <div className={s.divHeader}>
        <h2>Verificar cuenta</h2>
        <p>Su cuenta ha sido registrada con éxito. Ahora solo falta verificar su cuenta con una selfie y la imagen del dni (frente y reverso)</p>
      </div>
    </div>
  )
};


export default VerifyAccount;
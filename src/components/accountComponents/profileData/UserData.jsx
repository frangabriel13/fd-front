import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addLogoToManufacturer } from '../../../store/actions/manufacturerActions';
import s from './UserData.module.css';

const UserData = ({ user }) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(file) {
      const formData = new FormData();
      formData.append('image', file);
      dispatch(addLogoToManufacturer(user.manufacturer.id, formData));
    }
  };

  return (
    <div className={s.container}>
      {
        user.role === 'manufacturer' && (
          <div className={s.imageContainer} onClick={handleImageClick}>
            <img src={user.manufacturer.image} alt="user" />
            <input
              type="file"
              ref={inputRef}
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
          </div>
        )
      }
      <div className={s.userContainer}>
        <h3>Mis datos</h3>
        <div className={s.divData}>
          <div className={s.divInput}>
            <h4>Email</h4>
            <p>{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  )
};


export default UserData;
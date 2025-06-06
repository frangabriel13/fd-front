import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addLogoToManufacturer, activateLiveManufacturer } from '../../../store/actions/manufacturerActions';
import { FiPlus, FiEdit } from 'react-icons/fi';
import s from './UserData.module.css';
import SuccessModal from '../../modals/SuccessModal';

const UserData = ({ user }) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [hover, setHover] = useState(false);
  const [showModal, setShowModal] = useState(false);

  console.log('UserData component rendered with user:', user);

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

  const handleLiveClick = () => {
    if (!user.manufacturer.tiktokUrl) {
      setShowModal(true);
      return;
    }
    dispatch(activateLiveManufacturer());
  };
  
  const hasImage = !!(user.manufacturer && user.manufacturer.image);

  return (
    <div className={s.container}>
      {
        user.role === 'manufacturer' && (
          <div
            className={s.imageContainer}
            onClick={handleImageClick}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            {hasImage ? (
              <>
                <img src={user.manufacturer.image} alt="user" />
                {hover && (
                  <div className={s.iconOverlay}>
                    <FiEdit size={32} />
                  </div>
                )}
              </>
            ) : (
              <div className={s.iconCenter}>
                <FiPlus size={40} />
              </div>
            )}
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
      {/* <div className={s.divLive}>
        <button
          className={`${s.buttonLive} ${user.manufacturer.live ? s.liveActive : s.liveInactive}`}
          onClick={handleLiveClick}
        >
          LIVE
        </button>
        <p>
          {user.manufacturer.live
            ? <span className={s.textLive}>Estás en vivo</span>
            : <span className={s.textNotLive}>No estás en vivo</span>
          }
        </p>
      </div> */}
      {user.role === 'manufacturer' && (
        <div className={s.divLive}>
          <button
            className={`${s.buttonLive} ${user.manufacturer.live ? s.liveActive : s.liveInactive}`}
            onClick={handleLiveClick}
          >
            LIVE
          </button>
          <p>
            {user.manufacturer.live
              ? <span className={s.textLive}>Estás en vivo</span>
              : <span className={s.textNotLive}>No estás en vivo</span>
            }
          </p>
        </div>
      )}
      {showModal && (
        <SuccessModal
          title="Completa tus datos"
          message="Debes editar tus datos y agregar tu nick de TikTok para poder activar el modo en vivo."
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
};


export default UserData;
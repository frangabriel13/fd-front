import { useNavigate } from 'react-router-dom';
import s from './TableFollows.module.css';

const MyFollows = ({ follows, onUnfollows }) => {
  const navigate = useNavigate();

  const handleViewManufacturer = (userId) => {
    navigate(`/store/${userId}`);
  };

  return (
    <div className={s.container}>
      <h3>Fabricantes seguidos</h3>
      <div className={s.divFollows}>
        {follows.map((item, index) => (
          <div key={index} className={s.followItem}>
            <div className={s.divItem}>
              <img src={item.image} alt={item.name} className={s.image} />
              <div className={s.divData}>
                <p className={s.name}>{item.name}</p>
              </div>
            </div>
            <div className={s.divActions}>
              <button 
                onClick={() => onUnfollows(item.userId)} 
                className={s.buttonUnfollow}
              >Dejar de seguir</button>
              <button 
                className={s.buttonView} 
                onClick={() => handleViewManufacturer(item.userId)}
              >Ver tienda</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
};


export default MyFollows;
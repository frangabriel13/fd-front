import { useNavigate } from 'react-router-dom';
import s from './LiveManufacturer.module.css';

const LiveManufacturer = ({ manufacturer }) => {
  const navigate = useNavigate();

  const handleClick = () => {
  if (manufacturer.live && manufacturer.tiktokUrl) {
    window.open(manufacturer.tiktokUrl, '_blank');
  } else {
    navigate(`/store/${manufacturer.user.id}`);
  }
};

  return (
    <div className={s.container}>
      <div className={s.divImage}>
        <img 
          src={manufacturer.image} 
          alt={manufacturer.name} 
          onClick={handleClick}
          className={manufacturer.live ? `${s.image} ${s.liveImage}` : s.image} 
        />
        { manufacturer.live && <div className={s.live}>LIVE</div> }
      </div>
    </div>
  )
}


export default LiveManufacturer;
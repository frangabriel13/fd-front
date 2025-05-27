import { useNavigate } from 'react-router-dom';
import s from './ManufacturerCard.module.css';

const ManufacturerCard = ({ manufacturer }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/store/${manufacturer.userId}`);
  };

  return (
    <div className={s.container}>
      <div className={s.divImage}>
        <img src={manufacturer.image} alt={manufacturer.name} onClick={handleClick} />
        {manufacturer.live && <div className={s.live}>LIVE</div>}
      </div>
      <h3>{manufacturer.name}</h3>
    </div>
  );
}


export default ManufacturerCard;
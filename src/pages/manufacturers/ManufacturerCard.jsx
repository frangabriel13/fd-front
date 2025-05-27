import { useNavigate } from 'react-router-dom';
import s from './ManufacturerCard.module.css';

const ManufacturerCard = ({ manufacturer }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/store/${manufacturer.user.id}`);
  };

  const handleImageClick = (e) => {
    if (manufacturer.live) {
      e.stopPropagation();
      window.open(manufacturer.tiktokUrl, '_blank');
    } else {
      // Si no está en vivo, deja que el click siga su curso y navegue a store
      // No hacemos nada aquí
    }
  };
  return (
    <div className={s.container} onClick={handleCardClick}>
      <div className={s.divImage}>
        <img src={manufacturer.image} alt={manufacturer.name} onClick={handleImageClick} />
        {manufacturer.live && <div className={s.live}>LIVE</div>}
      </div>
      <h3>{manufacturer.name}</h3>
    </div>
  );
}


export default ManufacturerCard;
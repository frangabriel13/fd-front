import { useNavigate } from 'react-router-dom';
import s from './ManufacturerCard.module.css';

const ManufacturerCard = ({ manufacturer }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/store/${manufacturer.id}`);
  };

  return (
    <div className={s.container}>
      <img src={manufacturer.image} alt={manufacturer.name} onClick={handleClick} />
      <h3>{manufacturer.name}</h3>
    </div>
  );
}


export default ManufacturerCard;
import s from './ManufacturerCard.module.css';

const ManufacturerCard = ({ manufacturer }) => {
  return (
    <div className={s.container}>
      <img src={manufacturer.image} alt={manufacturer.name} />
      <h3>{manufacturer.name}</h3>
    </div>
  );
}


export default ManufacturerCard;
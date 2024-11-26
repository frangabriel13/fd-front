import s from './LiveManufacturer.module.css';

const LiveManufacturer = ({ manufacturer }) => {
  return (
    <div className={s.container}>
      <img className={s.image} src={manufacturer.image} alt={manufacturer.name} />
      <button className={s.btnMore}>Ver tienda</button>
    </div>
  )
}


export default LiveManufacturer;
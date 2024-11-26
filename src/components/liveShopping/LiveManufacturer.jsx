import s from './LiveManufacturer.module.css';

const LiveManufacturer = ({ manufacturer }) => {

  return (
    <div className={s.container}>
      <div className={s.divImage}>
        <img src={manufacturer.image} alt={manufacturer.name} className={manufacturer.live ? `${s.image} ${s.liveImage}` : s.image} />
        { manufacturer.live && <div className={s.live}>LIVE</div> }
      </div>
      <button className={s.btnMore}>Ver tienda</button>
    </div>
  )
}


export default LiveManufacturer;
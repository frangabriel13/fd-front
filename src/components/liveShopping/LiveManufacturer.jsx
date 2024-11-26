import s from './LiveManufacturer.module.css';

const LiveManufacturer = ({ manufacturer }) => {
  console.log('manufacturer');

  return (
    <div className={s.container}>
      Éste es un manufacturer
    </div>
  )
}


export default LiveManufacturer;
import s from './Maintenance.module.css';

const Maintenance = () => {
  return (
    <div className={s.maintenance}>
      <span className={s.icon}>🛠️</span>
      <h1>¡Estamos en mantenimiento!</h1>
      <p>Estamos trabajando para mejorar tu experiencia.<br />Por favor, vuelve a intentarlo más tarde.</p>
    </div>
  );
};

export default Maintenance;
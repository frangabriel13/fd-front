import s from './CompleteRegistration.module.css';

const CompleteRegistration = () => {
  return (
    <div className={s.container}>
      <div>
        <h2>Completar registro</h2>
        <p>Por favor, completa tu registro para poder acceder a todas las funcionalidades de la aplicación.</p>
      </div>
      <div className={s.divOptions}>
        <button>Fabricante</button>
        <button>Mayorista</button>
      </div>
    </div>
  )
};


export default CompleteRegistration;
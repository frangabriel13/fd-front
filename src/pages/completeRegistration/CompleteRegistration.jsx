import { useState } from 'react';
import RegisterWholesaler from '../../components/registerWholesaler/RegisterWholesaler';
import RegisterManufacturer from '../../components/registerManufacturer/RegisterManufacturer';
import s from './CompleteRegistration.module.css';

const CompleteRegistration = () => {
  const [role, setRole] = useState('');

  const handleRoleSelection = (role) => {
    setRole(role);
  };

  return (
    <div className={s.container}>
      <div>
        <h2>Completar registro</h2>
        <p>Por favor, completa tu registro para poder acceder a todas las funcionalidades de la aplicación.</p>
      </div>
      <div className={s.divOptions}>
        <button className={s.btnOption} onClick={() => handleRoleSelection('manufacturer')}>Fabricante</button>
        <button className={s.btnOption} onClick={() => handleRoleSelection('wholesaler')}>Mayorista</button>
      </div>
      {
        role === 'manufacturer' && <RegisterManufacturer />
      }
      {
        role === 'wholesaler' && <RegisterWholesaler />
      }
    </div>
  )
};


export default CompleteRegistration;
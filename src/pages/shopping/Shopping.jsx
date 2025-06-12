import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GenderFilter from '../../components/shopping/GenderFilter';
import s from './Shopping.module.css';

const Shopping = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/tienda/mujer', { replace: true });
  }, [navigate]);

  const handleGenderSelect = (gender) => {
    navigate(`/tienda/${gender}`);
  };

  return (
    <div className={s.container}>
      <GenderFilter onSelect={handleGenderSelect} />
    </div>
  );
};


export default Shopping;
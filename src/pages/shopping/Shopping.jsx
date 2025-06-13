import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GenderFilter from '../../components/shopping/GenderFilter';
import CategoryFilter from '../../components/shopping/CategoryFilter';
import s from './Shopping.module.css';

const Shopping = () => {
  const navigate = useNavigate();
  const { gender } = useParams();

  useEffect(() => {
    if(!gender) {
      navigate('/tienda/mujer', { replace: true });
    }
  }, [navigate, gender]);

  const handleGenderSelect = (selectedGender) => {
    navigate(`/tienda/${selectedGender}`);
  };

  return (
    <div className={s.container}>
      <GenderFilter selectedGender={gender} onSelect={handleGenderSelect} />
    </div>
  );
};


export default Shopping;
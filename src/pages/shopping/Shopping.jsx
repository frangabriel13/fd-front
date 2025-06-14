import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GenderFilter from '../../components/shopping/GenderFilter';
import CategoryFilter from '../../components/shopping/CategoryFilter';
import Catalog from '../../components/shopping/Catalog';
import s from './Shopping.module.css';
import { genders } from '../../utils/hardcodeo';

const Shopping = () => {
  const navigate = useNavigate();
  const { gender, category } = useParams();

  useEffect(() => {
    if(!gender) {
      navigate('/tienda/mujer', { replace: true });
    }
  }, [navigate, gender]);

  const handleGenderSelect = (selectedGender) => {
    if (category) {
      navigate(`/tienda/${selectedGender}/${category}`);
    } else {
      navigate(`/tienda/${selectedGender}`);
    }
  };

   const handleCategorySelect = (selectedCategory) => {
    navigate(`/tienda/${gender}/${selectedCategory}`);
  };

  const selectedGenderObj = genders.find(g => g.url === gender);
  const categories = selectedGenderObj ? selectedGenderObj.categories : [];

  return (
    <div className={s.container}>
      {!category ? (
        <>
          <GenderFilter 
            selectedGender={gender} 
            onSelect={handleGenderSelect} 
            genders={genders} 
          />
          <CategoryFilter 
            categories={categories} 
            onSelect={handleCategorySelect} 
            selectedCategory={category}
          />
        </>
      ) : (
        <Catalog gender={gender} category={category} />
      )}
    </div>
  );
};


export default Shopping;
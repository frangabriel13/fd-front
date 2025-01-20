import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../store/actions/categoryActions';
import s from './UploadProduct.module.css';
import { PiTShirtLight, PiTowel } from "react-icons/pi";
import { GiBigDiamondRing } from "react-icons/gi";
import ProductCharacteristics from './createProduct/ProductCharacteristics';
import OtherProductCharacteristics from './createProduct/OtherProductCharacteristics';
import SimpleProductForm from './createProduct/SimpleProductForm';
import BisuteriProductForm from './createProduct/BisuteriProductForm';
import VariableProductForm from './createProduct/VariableProductForm';

const UploadProduct = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const [productType, setProductType] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formProps, setFormProps] = useState(null);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleTypeClick = (type, id) => {
    setProductType({ type, id });
    setShowForm(false);
  }

  const handleShowForm = (props) => {
    setFormProps(props);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setProductType(null);
    setFormProps(null);
  };

  return (
    <div className={s.container}>
      <div className={s.divHeader}>
        <div className={s.divTitle}>
          <h2>Subir producto</h2>
          <p>Elige el tipo de producto que quieres publicar</p>
        </div>
        <div className={s.divTypes}>
          <div 
            className={`${s.divCard} ${productType?.id === 1 ? s.selected : ''}`}
            onClick={() => handleTypeClick('Indumentaria', 1)}
          >
            <PiTShirtLight className={s.icon} />
            <p>Indumentaria</p>
          </div>
          <div 
            className={`${s.divCard} ${productType?.id === 2 ? s.selected : ''}`} 
            onClick={() => handleTypeClick('Blanquería', 2)}
          >
            <PiTowel className={s.icon} />
            <p>Blanquería</p>
          </div>
          <div 
            className={`${s.divCard} ${productType?.id === 3 ? s.selected : ''}`} 
            onClick={() => handleTypeClick('Bisutería', 3)}
          >
            <GiBigDiamondRing className={s.icon} />
            <p>Bisutería</p>
          </div>
        </div>
      </div>
      {productType && productType.id === 1 && (
        <ProductCharacteristics 
          productType={productType} 
          setProductType={setProductType} 
          categories={categories} 
          onShowForm={handleShowForm}
        />
      )}
      {productType && (productType.id === 2 || productType.id === 3) && (
        <OtherProductCharacteristics 
          productType={productType} 
          setProductType={setProductType} 
          categories={categories} 
          onShowForm={handleShowForm}
        />
      )}
      {showForm && productType.id === 1 && formProps && formProps.uniqueSize && (
        <VariableProductForm
          productType={formProps.productType}
          genderProduct={formProps.genderProduct}
          selectedCategory={formProps.selectedCategory}
          onClose={handleFormClose}
        />
      )}
      {showForm && productType.id === 1 && formProps && !formProps.uniqueSize && (
        <SimpleProductForm
          productType={formProps.productType}
          genderProduct={formProps.genderProduct}
          selectedCategory={formProps.selectedCategory}
        />
      )}
      {showForm && (productType.id === 2 || productType.id === 3) && (
        <BisuteriProductForm
          productType={formProps.productType}
          genderProduct={formProps.genderProduct}
          selectedCategory={formProps.selectedCategory}
        />
      )}
    </div>
  )
};


export default UploadProduct;
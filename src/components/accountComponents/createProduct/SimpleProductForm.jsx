import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../../../store/actions/productActions';
import s from './SimpleProductForm.module.css';

const SimpleProductForm = ({ productType, genderProduct, selectedCategory }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    tags: [],
    mainImage: '',
    images: [],
    sizes: [],
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      ...formData,
      type: productType,
      genderProduct,
      categoryId: selectedCategory,
    };
    dispatch(createProduct(productData));
  };
  
  return (
    <div className={s.container}>
      <div className={s.divTitle}>
        <h3>Completa el formulario</h3>
        <p>Rellena el siguiente formulario para terminar de crear tu producto</p>
      </div>
      <form className={s.form} onSubmit={handleSubmit}>
        <div className={s.divForm}>
          <div className={s.divInputs}>
            <div className={s.divInput}>
              <h4>Nombre</h4>
              <input
                className={s.input}
                type="text"
                name="owner"
                value={formData.owner}
                onChange={handleChange}
              />
            </div>
            <div className={s.divInput}>
              <h4>Precio</h4>
              <input
                className={s.input}
                type="text"
                name="owner"
                value={formData.owner}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className={s.divBtn}>
          <button className={s.btnForm} type='submit'>Siguiente</button>
        </div>
      </form>
    </div>
  )
}


export default SimpleProductForm;
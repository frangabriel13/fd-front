import s from './SimpleProductForm.module.css';

const SimpleProductForm = () => {
  return (
    <div>
      <h1>SimpleProductForm</h1>
    </div>
  )
}


export default SimpleProductForm;


// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { createProduct } from '../../../store/actions/productActions';
// import s from './SimpleProductForm.module.css';

// const SimpleProductForm = ({ productType, genderProduct, selectedCategory }) => {
//   const dispatch = useDispatch();
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     price: '',
//     tags: '',
//     mainImage: '',
//     images: [],
//     sizes: [],
//     stocks: [],
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const productData = {
//       ...formData,
//       productType,
//       genderProduct,
//       categoryId: selectedCategory,
//     };
//     dispatch(createProduct(productData));
//   };

//   return (
//     <div className={s.container}>
//       <h3>Formulario de Producto</h3>
//       <form onSubmit={handleSubmit}>
//         <div className={s.divInput}>
//           <label>Nombre del Producto</label>
//           <input type="text" name="name" value={formData.name} onChange={handleChange} />
//         </div>
//         <div className={s.divInput}>
//           <label>Descripción</label>
//           <textarea name="description" value={formData.description} onChange={handleChange} />
//         </div>
//         <div className={s.divInput}>
//           <label>Precio</label>
//           <input type="number" name="price" value={formData.price} onChange={handleChange} />
//         </div>
//         <div className={s.divInput}>
//           <label>Etiquetas</label>
//           <input type="text" name="tags" value={formData.tags} onChange={handleChange} />
//         </div>
//         <div className={s.divInput}>
//           <label>Imagen Principal</label>
//           <input type="text" name="mainImage" value={formData.mainImage} onChange={handleChange} />
//         </div>
//         <div className={s.divInput}>
//           <label>Imágenes</label>
//           <input type="text" name="images" value={formData.images} onChange={handleChange} />
//         </div>
//         <div className={s.divInput}>
//           <label>Tamaños</label>
//           <input type="text" name="sizes" value={formData.sizes} onChange={handleChange} />
//         </div>
//         <div className={s.divInput}>
//           <label>Stocks</label>
//           <input type="text" name="stocks" value={formData.stocks} onChange={handleChange} />
//         </div>
//         <button type="submit">Crear Producto</button>
//       </form>
//     </div>
//   );
// };

// export default SimpleProductForm;
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createPack } from '../../../store/actions/packActions';
import s from './CreatePack.module.css';
import SelectProducts from './SelectProducts';
import { formatPrice } from '../../../utils/utils';
import { createPackValidator } from '../../../utils/validations';
import SelectQuantities from './SelectQuantities';

const CreatePack = ({ onClose, myProducts }) => {
  const dispatch = useDispatch();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectProductsModal, setSelectProductsModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    quantityTotal: 0,
  });
  const [errors, setErrors] = useState({});
  const [quantityModal, setQuantityModal] = useState(false);

  useEffect(() => {
    const totalQuantity = selectedProducts.reduce((total, product) => total + parseInt(product.quantity), 0);
    setFormData(prevFormData => ({ ...prevFormData, quantityTotal: totalQuantity }));
  }, [selectedProducts]);

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const openSelectProducts = () => {
    setSelectProductsModal(true);
  };

  const closeSelectProduct = () => {
    setSelectProductsModal(false);
  }

  const handleSelectProducts = (products) => {
    const updatedProducts = products.map(product => {
      const existingProduct = selectedProducts.find(p => p.id === product.id);
  
      if (existingProduct) {
        return existingProduct;
      }
  
      const quantities = product.inventories.map(inv => ({
        id: inv.id,
        size: inv.size,
        color: inv.color,
        quantity: 0, // Inicialmente en 0, pero puede ser actualizado más adelante
      }));
  
      // Calcular la suma de quantities.quantity
      const totalQuantity = quantities.reduce((sum, q) => sum + q.quantity, 0);
  
      return { 
        ...product, 
        quantity: totalQuantity, 
        quantities 
      };
    });
  
    setSelectedProducts(updatedProducts);
    closeSelectProduct();
  };

  const openSelectQuantities = () => {
    setQuantityModal(true);
  };

  const closeSelectQuantities = () => {
    setQuantityModal(false);
  };

  const handleDeleteProduct = (id) => {
    setSelectedProducts(selectedProducts.filter(product => product.id !== id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const packData = {
      ...formData,
      price: parseInt(formData.price),
      products: selectedProducts.map(product => ({ id: product.id, quantity: product.quantity, quantities: product.quantities })),
    };

    const validationErrors = createPackValidator(packData);
    if(Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    dispatch(createPack(packData));
    onClose();
  };

  const handleSaveQuantities = (updatedProducts) => {
    const recalculatedProducts = updatedProducts.map(product => ({
      ...product,
      quantity: product.quantities.reduce((total, q) => total + q.quantity, 0), // Recalcular la suma de quantities.quantity
    }));
  
    setSelectedProducts(recalculatedProducts);
    closeSelectQuantities();
  };

  console.log('selectedProducts', selectedProducts);

  return (
    <div className={s.modal} onClick={handleClickOutside}>
      <div className={s.modalContent}>
        <div className={s.container}>
          <div className={s.divTitle}>
            <h3>Crear pack</h3>
            <p>Completa los campos para crear el pack de emprendedores</p>
          </div>
          <form className={s.form} onSubmit={handleSubmit}>
            <div className={s.divForm}>
              <div className={s.divInputs}>
                <div className={s.divInput}>
                  <h4 className={s.label}>Nombre</h4>
                  <input
                    className={s.input}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <p className={s.error}>{errors.name}</p>}
                </div>
                <div className={s.divInput}>
                  <h4 className={s.label}>Precio</h4>
                  <input
                    className={s.input}
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                  {errors.price && <p className={s.error}>{errors.price}</p>}
                </div>
              </div>
              <div className={s.divDescription}>
                <h4 className={s.label}>Descripción</h4>
                <textarea
                  className={s.textarea}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
                {errors.description && <p className={s.error}>{errors.description}</p>}
              </div>
              <div className={s.divProducts}>
                <button type='button' className={s.btnAdd} onClick={openSelectProducts}>Seleccionar productos</button>
                {errors.products && <p className={s.error}>{errors.products}</p>}
                <div className={s.list}>
                  {selectedProducts.map(product => (
                    <div key={product.id} className={s.productItem}>
                      <div className={s.dataProduct}>
                        <img src={product.mainImage} alt={product.name} className={s.productImage} />
                        <div className={s.productInfo}>
                          <h4>{product.name}</h4>
                          <p>{formatPrice(product.price)}</p>
                        </div>
                      </div>
                      <div className={s.divActions}>
                        <div className={s.quantity}>
                          <h5>Cantidad:</h5>
                          <span className={s.quantityValue}>
                            {product.quantities.reduce((total, q) => total + q.quantity, 0)}
                          </span>
                        </div>
                        <button className={s.btnDelete} onClick={() => handleDeleteProduct(product.id)}>X</button>
                      </div>
                    </div>
                  ))}
                  {errors.quantity && <p className={s.error}>{errors.quantity}</p>}
                </div>
                {selectedProducts.length > 0 &&
                  <button type='button' className={s.btnAdd} onClick={openSelectQuantities}>Editar cantidades</button>
                }
              </div>
            </div>
            <hr className={s.divider} />
            <div className={s.divBtn}>
              <button className={s.btnCancel} onClick={onClose}>Cerrar</button>
              <button className={s.btnNext} type='submit'>Crear Pack</button>
            </div>
          </form>
        </div>
      </div>
      {selectProductsModal && 
        <SelectProducts 
          onClose={closeSelectProduct} 
          myProducts={myProducts}
          selectedProducts={selectedProducts}
          onSelect={handleSelectProducts}
        />
      }
      {quantityModal &&
        <SelectQuantities 
          products={selectedProducts} 
          onClose={closeSelectQuantities}
          onSave={handleSaveQuantities}
        />
      }
    </div>
  )
};


export default CreatePack;
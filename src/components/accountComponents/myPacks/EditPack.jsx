import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updatePack } from '../../../store/actions/packActions';
import SelectProducts from './SelectProducts';
import { formatPrice } from '../../../utils/utils';
import s from './CreatePack.module.css';
import { createPackValidator } from '../../../utils/validations';

const EditPack = ({ pack, closeModal, myProducts }) => {
  const dispatch = useDispatch();
  console.log('quant', pack);
  const [selectedProducts, setSelectedProducts] = useState(
    pack.products.map(product => ({ ...product, quantity: product.productpack.quantity || 1 }))
  );
  const [selectProductsModal, setSelectProductsModal] = useState(false);
  const [formData, setFormData] = useState({
    name: pack.name,
    price: pack.price,
    description: pack.description,
    quantityTotal: pack.quantityTotal,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const totalQuantity = selectedProducts.reduce((total, product) => total + parseInt(product.quantity), 0);
    setFormData(prevFormData => ({ ...prevFormData, quantityTotal: totalQuantity }));
  }, [selectedProducts]);

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  const openSelectProducts = () => {
    setSelectProductsModal(true);
  }

  const closeSelectProduct = () => {
    setSelectProductsModal(false);
  }

  const handleSelectProducts = (products) => {
    const productsWithQuantity = products.map(product => ({ ...product, quantity: 1 }));
    setSelectedProducts(productsWithQuantity);
    closeSelectProduct();
  }

  const handleQuantityChange = (id, quantity) => {
    setSelectedProducts(selectedProducts.map(product => {
      if(product.id === id) {
        return { ...product, quantity: parseInt(quantity) };
      }
      return product;
    }));
  }

  const handleDeleteProduct = (id) => {
    setSelectedProducts(selectedProducts.filter(product => product.id !== id));
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const packData = {
      ...formData,
      price: parseInt(formData.price),
      products: selectedProducts.map(product => ({ id: product.id, quantity: product.quantity })),
      id: pack.id,
    };

    const validationErrors = createPackValidator(packData);
    if(Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({})
    dispatch(updatePack(packData)).then(() => {
      closeModal();
    });
  }

  return (
    <div className={s.modal} onClick={handleClickOutside}>
      <div className={s.modalContent}>
        <div className={s.container}>
          <div className={s.divTitle}>
            <h3>Editar pack</h3>
            <p>Edita los campos del pack y selecciona los productos que lo componen</p>
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
                          <input 
                            type="number"
                            value={product.quantity}
                            onChange={(e) => handleQuantityChange(product.id, e.target.value)} 
                          />
                        </div>
                        <button className={s.btnDelete} onClick={() => handleDeleteProduct(product.id)}>X</button>
                      </div>
                    </div>
                  ))}
                  {errors.quantity && <p className={s.error}>{errors.quantity}</p>}
                </div>
              </div>
            </div>
            <hr className={s.divider} />
            <div className={s.divBtn}>
              <button className={s.btnCancel} onClick={closeModal}>Cerrar</button>
              <button className={s.btnNext} type='submit'>Guardar cambios</button>
            </div>
          </form>
        </div>
        {selectProductsModal && 
          <SelectProducts 
            onClose={closeSelectProduct} 
            myProducts={myProducts}
            selectedProducts={selectedProducts}
            onSelect={handleSelectProducts}
          />
        }
      </div>
    </div>
  );
};


export default EditPack;
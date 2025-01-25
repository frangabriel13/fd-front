import { useState } from 'react';
import s from './TableMyProducts.module.css';
import { formatPrice } from '../../../utils/utils';
import EditSimpleProduct from './EditSimpleProduct';
import EditVariableProduct from './EditVariableProduct';
import EditBisuteriProduct from './EditBisuteriProduct';

const TableMyProducts = ({ myProducts, handleEdit, handleDelete, sizes }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVariable, setIsVariable] = useState(false);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsVariable(product.isVariable);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setIsVariable(false);
  };

  console.log(myProducts);
  return (
    <div className={s.container}>
      <h3>Mis Productos</h3>
      <div className={s.divData}>
        {/* <div className={s.divSearch}>
          <h4>Search</h4>
          <p>Aca va el search</p>
        </div> */}
        <div className={s.divProducts}>
          <table className={s.table}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Categoría</th>
                <th>Género</th>
                <th>ARS</th>
                <th>USD</th>
                <th className={s.thActions}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                myProducts.map(product => (
                  <tr key={product.id}>
                    <td><img src={product.mainImage} alt={product.name} /></td>
                    <td>{product.name}</td>
                    <td>{product.category.parent.name}</td>
                    <td>{product.category.name}</td>
                    <td>{product.gender ? product.gender.name : 'No'}</td>
                    <td>{formatPrice(product.price)}</td>
                    <td>{product.priceDolar}</td>
                    <td className={s.tdActions}>
                      <button className={s.btnEdit} onClick={() => openModal(product)}>Editar</button>
                      <button className={s.btnDelete} onClick={() => handleDelete(product.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && (
        isVariable ? (
          <EditVariableProduct product={selectedProduct} handleEdit={handleEdit} closeModal={closeModal} />
        ) : (
          selectedProduct.category.parent.name === 'Indumentaria' ? (
            <EditSimpleProduct product={selectedProduct} handleEdit={handleEdit} closeModal={closeModal} sizes={sizes} />
          ) : (
            <EditBisuteriProduct product={selectedProduct} handleEdit={handleEdit} closeModal={closeModal} />
          )
        )
      )}
    </div>
  );
};


export default TableMyProducts;
import { useState } from 'react';
import s from './TableMyProducts.module.css';
import { formatPrice } from '../../../utils/utils';
import EditSimpleProduct from './EditSimpleProduct';
import EditVariableProduct from './EditVariableProduct';
import EditBisuteriProduct from './EditBisuteriProduct';
import Pagination from '../../Pagination/Pagination';

const TableMyProducts = ({ 
    myProducts, 
    handleDelete, 
    sizes,
    myCurrentPage,
    myPageSize,
    myTotalProducts,
    onPageChange,
  }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVariable, setIsVariable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

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

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      handleDelete(productToDelete.id);
      setShowDeleteConfirm(false);
      setProductToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setProductToDelete(null);
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
                <th>Imagen</th>
                <th>Nombre</th>
                <th>ARS</th>
                <th className={s.thActions}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                myProducts?.map(product => (
                  <tr key={product.id}>
                    <td><img src={product.mainImage} alt={product.name} /></td>
                    <td>{product.name}</td>
                    <td>{formatPrice(product.price)}</td>
                    <td className={s.tdActions}>
                      <button className={s.btnEdit} onClick={() => openModal(product)}>Editar</button>
                      <button className={s.btnDelete} onClick={() => handleDeleteClick(product)}>Eliminar</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={myCurrentPage}
          onPageChange={onPageChange}
          totalProducts={myTotalProducts}
          pageSize={myPageSize}
        />
      </div>
      {/* {isModalOpen && (
        isVariable ? (
          <EditVariableProduct product={selectedProduct} closeModal={closeModal} />
        ) : (
          selectedProduct.category.parent.name === 'Indumentaria' ? (
            <EditSimpleProduct product={selectedProduct} closeModal={closeModal} sizes={sizes} />
          ) : (
            <EditBisuteriProduct product={selectedProduct} closeModal={closeModal} />
          )
        )
      )} */}
      {isModalOpen && (
        isVariable ? (
          <EditVariableProduct product={selectedProduct} closeModal={closeModal} />
        ) : (
          selectedProduct.category?.parent && selectedProduct.category.parent.name === 'Indumentaria' ? (
            <EditSimpleProduct product={selectedProduct} closeModal={closeModal} sizes={sizes} />
          ) : (
            <EditBisuteriProduct product={selectedProduct} closeModal={closeModal} />
          )
        )
      )}
      
      {/* Modal de confirmación para eliminar */}
      {showDeleteConfirm && (
        <div className={s.modalOverlay}>
          <div className={s.modalContent}>
            <h4>Confirmar eliminación</h4>
            <p>¿Estás seguro de que deseas eliminar el producto &quot;{productToDelete?.name}&quot;?</p>
            <p className={s.warningText}>Esta acción no se puede deshacer.</p>
            <div className={s.modalActions}>
              <button className={s.btnCancel} onClick={cancelDelete}>
                Cancelar
              </button>
              <button className={s.btnConfirmDelete} onClick={confirmDelete}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default TableMyProducts;
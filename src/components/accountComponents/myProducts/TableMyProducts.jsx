import { useState } from 'react';
import s from './TableMyProducts.module.css';
import { formatPrice } from '../../../utils/utils';
import EditSimpleProduct from './EditSimpleProduct';
import EditVariableProduct from './EditVariableProduct';

const TableMyProducts = ({ myProducts, handleEdit, handleDelete }) => {
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
                      <button className={s.btnEdit} onClick={() => handleEdit(product.id)}>Editar</button>
                      <button className={s.btnDelete} onClick={() => handleDelete(product.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


export default TableMyProducts;
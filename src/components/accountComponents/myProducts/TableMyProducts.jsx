import s from './TableMyProducts.module.css';

const TableMyProducts = ({ myProducts, handleEdit, handleDelete }) => {
  console.log(myProducts);
  return (
    <div className={s.container}>
      <h3>Mis Productos</h3>
      <div className={s.divData}>
        <div className={s.divSearch}>
          <h4>Search</h4>
          <p>Aca va el search</p>
        </div>
        <table className={s.table}>
          <thead>
            <tr>
              <th></th>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Categoría</th>
              <th>Género</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {
              myProducts.map(product => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td>
                  <td>
                    <button onClick={() => handleEdit(product.id)}>Editar</button>
                    <button onClick={() => handleDelete(product.id)}>Eliminar</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default TableMyProducts;
import s from './TableMyProducts.module.css';

const TableMyProducts = ({ myProducts, handleEdit, handleDelete }) => {
  return (
    <div className={s.container}>
      <h3>Mis Productos</h3>
      <div className={s.divData}>
        <div className={s.divInput}>
          <h4>Email</h4>
          <p>Text</p>
        </div>
      </div>
    </div>
  );
};


export default TableMyProducts;
import s from './SubOrderDetail.module.css';

const SubOrderDetail = ({ subOrder, onClose }) => {
  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  console.log(subOrder);
  return (
    <div className={s.modal} onClick={handleClickOutside}>
      <div className={s.modalContent}>
        <div className={s.container}>
          <div className={s.divTitle}>
            <h3>Detalle de la orden</h3>
          </div>
          <div className={s.divTable}>
            {subOrder.products && subOrder.products.length > 0 && (
              <div className={s.tableSection}>
                <h4>Productos</h4>
                <table className={s.table}>
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Precio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subOrder.products.map((product, index) => (
                      <tr key={index}>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {subOrder.packs && subOrder.packs.length > 0 && (
              <div className={s.tableSection}>
                <h4>Packs</h4>
                <table className={s.table}>
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Precio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subOrder.packs.map((pack, index) => (
                      <tr key={index}>
                        <td>{pack.name}</td>
                        <td>{pack.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        <div className={s.divActions}>
          <button className={s.btnCancel} onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  )
};


export default SubOrderDetail;
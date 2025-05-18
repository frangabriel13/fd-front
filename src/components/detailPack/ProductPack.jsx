import { useNavigate } from 'react-router-dom';
import s from './ProductPack.module.css';
import { formatPrice } from '../../utils/utils';

const ProductPack = ({ product }) => {
  const navigate = useNavigate();

  const handleViewProduct = () => {
    navigate(`/producto/${product.id}`);
  }

  return(
    <div className={s.container}>
      <div className={s.divData}>
        <div className={s.divLeft}>
          <div className={s.divImage}>
            <img src={product.mainImage} alt={product.name} className={s.image} />
          </div>
          <div className={s.dataProduct}>
            <h3 className={s.title}>{product.name}</h3>
            <p className={s.price}>{formatPrice(product.price)}</p>
          </div>
        </div>
        <div className={s.divRight}>
          <div className={s.variants}>
            <p>Lista de variantes:</p>
            <table className={s.table}>
              <thead>
                <tr>
                  <th>{product.isVariable ? 'Color' : 'Talle'}</th>
                  <th>Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {product.productpack.quantities
                  .filter(variant => variant.quantity > 0)
                  .map((variant, index) => (
                    <tr key={index}>
                      <td>{product.isVariable ? variant.color : variant.size}</td>
                      <td>{variant.quantity}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className={s.divTotal}>
        <div className={s.total}>
          <p className={s.totalText}>Total</p>
          <p className={s.totalQuantity}>{product.productpack.quantity} unidades</p>
        </div>
        <button className={s.btnMore} onClick={handleViewProduct}>Ver</button>
      </div>
    </div>
  )
};


export default ProductPack;
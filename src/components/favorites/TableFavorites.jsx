import { useNavigate } from 'react-router-dom';
import s from './TableFavorites.module.css';
import { formatPrice } from '../../utils/utils';

const TableFavorites = ({ favorites, onDelete }) => {
  const navigate = useNavigate();

  const handleViewProduct = (productId) => {
    navigate(`/producto/${productId}`);
  };

  return (
    <div className={s.container}>
      <h3>Mis favoritos</h3>
      <div className={s.divFavorites}>
        {favorites.map((item, index) => (
          <div key={index} className={s.favoriteItem}>
            <div className={s.divItem}>
              <img src={item.mainImage} alt={item.name} className={s.image} />
              <div className={s.divData}>
                <p className={s.name}>{item.name}</p>
                <p className={s.price}>{formatPrice(item.price)}</p>
              </div>
            </div>
            <div className={s.divActions}>
              <button 
                onClick={() => onDelete(item.productId)} 
                className={s.buttonDelete}
              >Eliminar</button>
              <button 
                className={s.buttonView} 
                onClick={() => handleViewProduct(item.productId)}
              >Ver producto</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
};


export default TableFavorites;
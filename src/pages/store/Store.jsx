import { useParams } from 'react-router-dom';
import s from './Store.module.css';

const Store = () => {
  const { manufacturerId } = useParams();

  return (
    <div className={s.store}>
      <h1>Tienda del fabricante {manufacturerId}</h1>
    </div>
  );
};


export default Store;
import { useState } from 'react';
import s from './Products.module.css';
import ProductCard from './ProductCard';

const Products = ({ products, onSortChange, manufacturerId, minPurchase, image }) => {
  const [sortOrder, setSortOrder] = useState('newest');

  const handleSortChange = (event) => {
    const newSortOrder = event.target.value;
    setSortOrder(newSortOrder);
    onSortChange(newSortOrder);
  };

  return (
    <div className={s.container}>
      <div className={s.divHeader}>
        <h3>Todos los productos</h3>
        <div className={s.divSelect}>
          <label>Ordenar por:</label>
          <select className={s.select} value={sortOrder} onChange={handleSortChange}>
            <option value="newest">Más nuevos</option>
            <option value="lowestPrice">Menor precio</option>
            <option value="highestPrice">Mayor precio</option>
          </select>
        </div>
      </div>
      <div className={s.divProducts}>
        {products.map(product => (
            <ProductCard 
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.mainImage}
              price={product.price}
              manufacturerId={manufacturerId}
              minPurchase={minPurchase}
              logo={image}
            />
        ))}
      </div>
    </div>
  );
};


export default Products;
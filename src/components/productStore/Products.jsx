import s from './Products.module.css';
import ProductCard from './ProductCard';

const Products = ({ products }) => {
  console.log(products);

  return (
    <div className={s.container}>
      <div className={s.divHeader}>
        <h3>Todos los productos</h3>
        <div className={s.divSelect}>
          <label>Ordenar por:</label>
          <select className={s.select}>
            <option>Más nuevos</option>
            <option>Menor precio</option>
            <option>Mayor precio</option>
          </select>
        </div>
      </div>
      <div className={s.divProducts}>
        {products.map(product => (
            <ProductCard 
              key={product.id} 
              name={product.name}
              image={product.mainImage}
              price={product.price}
            />
        ))}
      </div>
    </div>
  );
};


export default Products;
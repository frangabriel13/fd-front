import s from './Products.module.css';
import ProductCard from './ProductCard';

const Products = ({ products }) => {
  console.log(products);

  return (
    <div className={s.container}>
      <h3>Productos</h3>
      <div className={s.divProducts}>
        <ProductCard />
      </div>
    </div>
  );
};


export default Products;
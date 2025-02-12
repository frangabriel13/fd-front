import s from './Products.module.css';

const Products = ({ products }) => {
  console.log(products);

  return (
    <div className={s.container}>
      <h1>Products</h1>
    </div>
  );
};


export default Products;
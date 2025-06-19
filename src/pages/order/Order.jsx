import s from './Order.module.css';

const Order = () => {
  return (
    <div className={s.orderContainer}>
      <h1 className={s.title}>Order Page</h1>
      <p className={s.description}>This is the order page where you can view and manage your orders.</p>
      {/* Additional content can be added here */}
    </div>
  );
};


export default Order;
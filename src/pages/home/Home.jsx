import Banner from '../../components/banner/Banner';
import Features from '../../components/features/Features';
import LiveShopping from '../../components/liveShopping/LiveShopping';
import NewArrivals from '../../components/productRow/NewArrivals';
import PacksRow from '../../components/productRow/PacksRow';
import GenederList from '../../components/genderList/GenderList';
import ProductsOnSale from '../../components/productRow/ProductsOnSale';
import s from './Home.module.css';

const Home = () => {
  return (
    <div className={s.container}>
      <Banner />
      <div className={s.home}>
        <Features />
        <LiveShopping />
        <GenederList />
        <NewArrivals />
        <ProductsOnSale />
        <PacksRow />
      </div>
    </div>
  );
};


export default Home;
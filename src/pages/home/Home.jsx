import Banner from '../../components/banner/Banner';
import Features from '../../components/features/Features';
import LiveShopping from '../../components/liveShopping/LiveShopping';
import NewArrivals from '../../components/productRow/NewArrivals';
import PacksRow from '../../components/productRow/PacksRow';
import GenederList from '../../components/genderList/GenderList';
import ProductsOnSale from '../../components/productRow/ProductsOnSale';
import BisBlanProducts from '../../components/productRow/BisBlanProducts';
import s from './Home.module.css';

const Home = () => {
  return (
    <div className={s.container}>
      <div>
        <Banner />
      </div>
      <div className={s.home}>
        <LiveShopping />
        <GenederList />
        <Features />
        <NewArrivals />
        <ProductsOnSale />
        <BisBlanProducts />
        <PacksRow />
      </div>
    </div>
  );
};


export default Home;
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
        <div className={s.divWarning}>
          <h5 className={s.title}>Algunas funcionalidades se encuentran momentáneamente desactivadas porque se están realizando cambios para mejorar tu experiencia en nuestra web</h5>
        </div>
        <Banner />
      </div>
      <div className={s.home}>
        <Features />
        <LiveShopping />
        <GenederList />
        <NewArrivals />
        <ProductsOnSale />
        <BisBlanProducts />
        <PacksRow />
      </div>
    </div>
  );
};


export default Home;
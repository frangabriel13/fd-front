import Banner from '../../components/banner/Banner';
import Features from '../../components/features/Features';
import LiveShopping from '../../components/liveShopping/LiveShopping';
import s from './Home.module.css';

const Home = () => {
  return (
    <div className={s.container}>
      <Banner />
      <div className={s.home}>
        <Features />
        <LiveShopping />
      </div>
    </div>
  );
};


export default Home;
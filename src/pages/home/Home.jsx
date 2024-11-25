import Banner from '../../components/banner/Banner';
import Features from '../../components/features/Features';
import s from './Home.module.css';

const Home = () => {
  return (
    <div className={s.container}>
      <Banner />
      <div className={s.home}>
        <Features />
      </div>
    </div>
  );
};


export default Home;
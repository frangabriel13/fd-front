import Banner from '../../components/banner/Banner';
import s from './Home.module.css';

const Home = () => {
  return (
    <div className={s.divContainer}>
      <Banner />
    </div>
  );
};


export default Home;
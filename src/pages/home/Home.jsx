import Header from '../../components/header/Header';
import s from './Home.module.css';

const Home = () => {
  return (
    <div className={s.divContainer}>
      <Header />
      <h1>Éste es el HOME</h1>
    </div>
  );
};


export default Home;
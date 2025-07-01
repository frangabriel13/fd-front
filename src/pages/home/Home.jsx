import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../store/actions/userActions";
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getMe()).then(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    if (!loading && isAuthenticated && user && user.role === null) {
      navigate('/mi-cuenta');
    }
  }, [loading, isAuthenticated, user, navigate]);

  if (loading && isAuthenticated) {
    return <div>Cargando...</div>;
  }

  return (
    <div className={s.container}>
      <div>
        <Banner />
      </div>
      <div className={s.home}>
        <GenederList />
        <LiveShopping />
        <NewArrivals />
        <PacksRow />
        <ProductsOnSale />
        <BisBlanProducts />
        <Features />
      </div>
    </div>
  );
};


export default Home;
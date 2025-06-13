import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Home from './pages/home/Home';
import Header from './components/header/Header';
import HeaderMobile from './components/header/HeaderMobile';
import Login from './pages/login/Login';
import HeaderLogin from './components/header/HeaderLogin';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import Register from './pages/register/Register';
import VerifyEmail from './pages/verifyEmail/VerifyEmail';
import ResetPassword from './pages/resetPassword/ResetPassword';
import Account from './pages/account/Account';
import CompleteRegistration from './pages/completeRegistration/CompleteRegistration';
import VerifyAccount from './pages/verifyAccount/VerifyAccount';
import Store from './pages/store/Store';
import Footer from './components/footer/Footer';
import Shop from './pages/shop/Shop';
import ProductDetail from './pages/productDetail/ProductDetail';
import Manufacturers from './pages/manufacturers/Manufacturers';
import Help from './pages/help/Help';
import Cart from './pages/cart/Cart';
import PackDetail from './pages/packDetail/PackDetail';
import useWindowWidth from './hooks/useWindowWidth';
import Maintenance from './components/maintenance/Maintenance';
import Packs from './pages/packs/Packs';
import Shopping from './pages/shopping/Shopping';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);
  const width = useWindowWidth();

  const loginPages = [
    '/ingresar', 
    '/recuperar-password', 
    '/registro', 
    '/verify-email',
    '/reset-password'
  ];
  const isLoginPage = loginPages.some(page => location.pathname.startsWith(page));

  useEffect(() => {
    if(isAuthenticated && isLoginPage) {
      navigate('/');
    }
  }, [isAuthenticated, isLoginPage, navigate]);

  useEffect(() => {
    if (!isAuthenticated && location.pathname.startsWith('/mi-cuenta')) {
      navigate('/ingresar');
    } 
    // else if (isAuthenticated && user && user.role === null && location.pathname.startsWith('/mi-cuenta')) {
    //   navigate('/completar-registro');
    // } 
    // else if (isAuthenticated && user && user.role === 'manufacturer' && (location.pathname.startsWith('/mi-cuenta') || location.pathname.startsWith('/completar-registro'))) {
    //   navigate('/verificar-cuenta');
    // }
  }, [isAuthenticated, user, location.pathname, navigate]);

  return (
    <div className="App">
      {isLoginPage ? (
        <HeaderLogin />
      ) : width < 768 ? (
        <HeaderMobile />
      ) : (
        <Header />
      )}
      <div className="App-content">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/ingresar' element={<Login />} />
          <Route path='/recuperar-password' element={<ForgotPassword />} />
          <Route path='/registro' element={<Register />} />
          <Route path='/verify-email' element={<VerifyEmail />} />
          <Route path='/reset-password/:token' element={<ResetPassword />} />
          <Route path='/mi-cuenta/*' element={<Account />} />
          <Route path='/completar-registro' element={<CompleteRegistration />} />
          <Route path='/verificar-cuenta' element={<VerifyAccount />} />
          <Route path='/store/:userId' element={<Store />} />
          {/* <Route path="/tienda" element={<Shop />} />
          <Route path="/tienda/:category" element={<Shop />} />
          <Route path="/tienda/:category/:subcategory" element={<Shop />} />
          <Route path="/tienda/:category/:gender" element={<Shop />} />
          <Route path="/tienda/:category/:gender/:subcategory" element={<Shop />} /> */}
          <Route path='/producto/:productId' element={<ProductDetail />} />
          <Route path='/fabricantes' element={<Manufacturers />} />
          <Route path='/preguntas-frecuentes' element={<Help />} />
          <Route path='/mi-carrito' element={<Cart />} />
          <Route path='/pack/:packId' element={<PackDetail />} />
          <Route path='/packs' element={<Packs />} />
          <Route path='/tienda' element={<Shopping />} />
          <Route path='/tienda/:gender' element={<Shopping />} />
          <Route path='/tienda/:gender/:category' element={<Shopping />} />
        </Routes>
      </div>
      {/* <Maintenance /> */}
      <Footer />
    </div>
  );
}


export default App;
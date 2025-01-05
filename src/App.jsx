import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Home from './pages/home/Home';
import Header from './components/header/Header';
import Login from './pages/login/Login';
import HeaderLogin from './components/header/HeaderLogin';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import Register from './pages/register/Register';
import VerifyEmail from './pages/verifyEmail/VerifyEmail';
import ResetPassword from './pages/resetPassword/ResetPassword';
import Account from './pages/account/Account';
import CompleteRegistration from './pages/completeRegistration/CompleteRegistration';
import VerifyAccount from './pages/verifyAccount/VerifyAccount';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);

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

  // useEffect(() => {
  //   if (!isAuthenticated && location.pathname.startsWith('/mi-cuenta')) {
  //     navigate('/ingresar');
  //   } else if (isAuthenticated && user && user.role === null && location.pathname.startsWith('/mi-cuenta')) {
  //     navigate('/completar-registro');
  //   } else if (isAuthenticated && user && user.role === 'manufacturer' && (location.pathname.startsWith('/mi-cuenta') || location.pathname.startsWith('/completar-registro'))) {
  //     navigate('/verificar-cuenta');
  //   }
  // }, [isAuthenticated, user, location.pathname, navigate]);

  return (
    <>
      {isLoginPage ? <HeaderLogin /> : <Header />}
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
      </Routes>
    </>
  );
}


export default App;
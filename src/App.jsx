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

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const loginPages = [
    '/ingresar', 
    '/recuperar-password', 
    '/registro', 
    '/verify-email',
    '/reset-password'
  ];
  const isLoginPage = loginPages.some(page => location.pathname.startsWith(page));

  useEffect(() => {
    if (isAuthenticated && isLoginPage) {
      navigate('/');
    }
  }, [isAuthenticated, isLoginPage, navigate]);

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
      </Routes>
    </>
  );
}


export default App;
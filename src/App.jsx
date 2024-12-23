import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/home/Home';
import Header from './components/header/Header';
import Login from './pages/login/Login';
import HeaderLogin from './components/header/HeaderLogin';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import Register from './pages/register/Register';
import VerifyEmail from './pages/verifyEmail/VerifyEmail';
import ResetPassword from './pages/resetPassword/ResetPassword';

function App() {
  const location = useLocation();
  const loginPages = [
    '/ingresar', 
    '/recuperar-password', 
    '/registro', 
    '/verify-email',
    '/reset-password'
  ];
  const isLoginPage = loginPages.some(page => location.pathname.startsWith(page));

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
      </Routes>
    </>
  );
}


export default App;
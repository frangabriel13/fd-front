import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/home/Home';
import Header from './components/header/Header';
import Login from './pages/login/Login';
import HeaderLogin from './components/header/HeaderLogin';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import Register from './pages/register/Register';
import VerifyEmail from './pages/verifyEmail/VerifyEmail';

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/ingresar' || location.pathname === '/recuperar-password' || location.pathname === '/registro';

  return (
    <>
      {isLoginPage ? <HeaderLogin /> : <Header />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ingresar' element={<Login />} />
        <Route path='/recuperar-password' element={<ForgotPassword />} />
        <Route path='/registro' element={<Register />} />
        <Route path='/verify-email' element={<VerifyEmail />} />
      </Routes>
    </>
  );
}


export default App;
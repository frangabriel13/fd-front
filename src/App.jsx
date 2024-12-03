import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/home/Home';
import Header from './components/header/Header';
import Login from './pages/login/Login';
import HeaderLogin from './components/header/HeaderLogin';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/ingresar' || location.pathname === '/recuperar-password';

  console.log('Ruta actual:', location.pathname);
  console.log('Es página de login:', isLoginPage);

  return (
    <>
      {isLoginPage ? <HeaderLogin /> : <Header />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ingresar' element={<Login />} />
        <Route path='/recuperar-password' element={<ForgotPassword />} />
      </Routes>
    </>
  );
}


export default App;
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/home/Home';
import Header from './components/header/Header';
import Login from './pages/login/Login';
import HeaderLogin from './components/header/HeaderLogin';

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/ingresar';

  return (
    <>
      {isLoginPage ? <HeaderLogin /> : <Header />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ingresar' element={<Login />} />
      </Routes>
    </>
  );
}


export default App;
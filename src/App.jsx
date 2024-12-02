import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home';
import Header from './components/header/Header';
import Login from './pages/login/Login';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ingresar' element={<Login />} />
      </Routes>
    </>
  )
}


export default App;
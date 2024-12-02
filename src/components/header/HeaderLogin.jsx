import s from './Header.module.css';
import logo from '../../assets/logo.jpg';
import { Link } from 'react-router-dom';

const HeaderLogin = () => {
  return (
    <div className={s.container}>
      <div className={s.divLogo}>
        <Link to="/">
          <img src={logo} alt="Logo" className={s.logo} />
        </Link>
      </div>
    </div>
  );
};


export default HeaderLogin;
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../store/actions/userActions";
import SidebarAccount from "../../components/sidebarAccount/SidebarAccount";
import s from "./Account.module.css";

const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.user.user);

  console.log('user account', user);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/ingresar");
    } else {
      dispatch(getMe());
    }
  }, [isAuthenticated, navigate, dispatch]);

  return (
    <div className={s.container}>
      <SidebarAccount />
      <div className={s.divAccount}>
        <h2>Mi Cuenta</h2>
      </div>
    </div>
  );
};


export default Account;
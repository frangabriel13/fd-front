import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SidebarAccount from "../../components/sidebarAccount/SidebarAccount";
import s from "./Account.module.css";

const Account = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/ingresar");
    }
  }, [isAuthenticated, navigate]);

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
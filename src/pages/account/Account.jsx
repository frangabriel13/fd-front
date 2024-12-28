import SidebarAccount from "../../components/sidebarAccount/SidebarAccount";
import s from "./Account.module.css";

const Account = () => {
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
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Routes, Route } from "react-router-dom";
import { getMe } from "../../store/actions/userActions";
import SidebarAccount from "../../components/sidebarAccount/SidebarAccount";
import Profile from "../../components/accountComponents/Profile";
import MyProducts from "../../components/accountComponents/MyProducts";
import MyOrders from "../../components/accountComponents/MyOrders";
import UploadProduct from "../../components/accountComponents/UploadProduct";
import s from "./Account.module.css";

const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.user.user);

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
        <Routes>
          <Route path="/" element={<Profile user={user} />} />
          <Route path="subir-producto" element={<UploadProduct />} />
          <Route path="publicaciones" element={<MyProducts />} />
          <Route path="ordenes" element={<MyOrders />} />
        </Routes>
      </div>
    </div>
  );
};


export default Account;
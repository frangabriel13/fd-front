import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Routes, Route } from "react-router-dom";
import { getMe } from "../../store/actions/userActions";
import SidebarAccount from "../../components/sidebarAccount/SidebarAccount";
import Profile from "../../components/accountComponents/Profile";
import MyProducts from "../../components/accountComponents/MyProducts";
import MyOrders from "../../components/accountComponents/MyOrders";
import UploadProduct from "../../components/accountComponents/UploadProduct";
import MyPacks from "../../components/accountComponents/MyPacks";
import s from "./Account.module.css";
import { getSizes } from '../../store/actions/sizeAction';

const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.user.user);
  const sizes = useSelector((state) => state.size.sizes);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/ingresar");
    } else {
      dispatch(getMe()).then(() => setLoading(false));
    }
  }, [isAuthenticated, navigate, dispatch]);

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated && user && user.role === null) {
        navigate('/completar-registro');
      } 
      // else if (isAuthenticated && user && user.role === 'manufacturer') {
      //   navigate('/verificar-cuenta');
      // }
    }
  }, [loading, isAuthenticated, user, navigate]);

  useEffect(() => {
    dispatch(getSizes());
  }, [dispatch]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className={s.container}>
      <SidebarAccount role={user.role} />
      <div className={s.divAccount}>
        <Routes>
          <Route path="/" element={<Profile user={user} />} />
          <Route path="subir-producto" element={<UploadProduct sizes={sizes} />} />
          <Route path="publicaciones" element={<MyProducts sizes={sizes} />} />
          <Route path="ordenes" element={<MyOrders />} />
          <Route path="packs" element={<MyPacks />} />
        </Routes>
      </div>
    </div>
  );
};

export default Account;
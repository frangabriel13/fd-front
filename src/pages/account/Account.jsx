import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Routes, Route } from "react-router-dom";
import { getMe } from "../../store/actions/userActions";
import SidebarAccount from "../../components/sidebarAccount/SidebarAccount";
import SidebarMobile from "../../components/sidebarAccount/SidebarMobile";
import Profile from "../../components/accountComponents/Profile";
import MyProducts from "../../components/accountComponents/MyProducts";
import MyOrders from "../../components/accountComponents/MyOrders";
import UploadProduct from "../../components/accountComponents/UploadProduct";
import MyPacks from "../../components/accountComponents/MyPacks";
import MyPurchases from "../../components/accountComponents/myPurchases/MyPurchases";
import Favorites from "../../components/favorites/Favorites";
import Users from "../../components/accountComponents/users/Users";
import ProtectedRoute from "../../components/protectedRoute/ProtectedRoute";
import s from "./Account.module.css";
import { getSizes } from '../../store/actions/sizeAction';
import { getProductsByUserId } from '../../store/actions/productActions';
import useWindowWidth from "../../hooks/useWindowWidth";

const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.user.user);
  const sizes = useSelector((state) => state.size.sizes);
  const myProducts = useSelector((state) => state.product.myProducts);
  const [loading, setLoading] = useState(true);

  const width = useWindowWidth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/ingresar");
    } else {
      dispatch(getMe()).then(() => setLoading(false));
    }
  }, [isAuthenticated, navigate, dispatch]);

  // useEffect(() => {
  //   if (!loading) {
  //     if (isAuthenticated && user && user.role === null) {
  //       navigate('/completar-registro');
  //     } 
  //     // else if (isAuthenticated && user && user.role === 'manufacturer') {
  //     //   navigate('/verificar-cuenta');
  //     // }
  //   }
  // }, [loading, isAuthenticated, user, navigate]);
  useEffect(() => {
  if (!loading) {
    if (isAuthenticated && user && user.role === null) {
      navigate('/completar-registro');
    } 
    else if (
      isAuthenticated &&
      user &&
      user.role === 'manufacturer' &&
      user.manufacturer &&
      // user.manufacturer.verificationStatus === 'pending'
      (user.manufacturer.verificationStatus === 'pending' ||
       user.manufacturer.verificationStatus === 'not_started')
    ) {
      navigate('/verificar-cuenta');
    }
  }
}, [loading, isAuthenticated, user, navigate]);

  useEffect(() => {
    dispatch(getSizes());
    dispatch(getProductsByUserId());
  }, [dispatch]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className={s.container}>
      {width < 768 ? (
        <SidebarMobile role={user.role} />
      ) : (
        <SidebarAccount role={user.role} />
      )}
      <div className={s.divAccount}>
        <Routes>
          <Route path="/" element={<Profile user={user} />} />
          <Route
            path="/subir-producto"
            element={
              <ProtectedRoute
                allowedRoles={["manufacturer"]}
                userRole={user.role}
              >
                <UploadProduct sizes={sizes} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/publicaciones"
            element={
              <ProtectedRoute
                allowedRoles={["manufacturer"]}
                userRole={user.role}
              >
                <MyProducts sizes={sizes} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ordenes"
            element={
              <ProtectedRoute
                allowedRoles={["manufacturer"]}
                userRole={user.role}
              >
                <MyOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/packs"
            element={
              <ProtectedRoute
                allowedRoles={["manufacturer"]}
                userRole={user.role}
              >
                <MyPacks myProducts={myProducts} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/compras"
            element={
              <ProtectedRoute
                allowedRoles={["wholesaler"]}
                userRole={user.role}
              >
                <MyPurchases />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favoritos"
            element={
              <ProtectedRoute
                allowedRoles={["wholesaler"]}
                userRole={user.role}
              >
                <Favorites />
              </ProtectedRoute>
            }
          />
          <Route
            path="/usuarios"
            element={
              <ProtectedRoute
                allowedRoles={["admin"]}
                userRole={user.role}
              >
                <Users />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Account;
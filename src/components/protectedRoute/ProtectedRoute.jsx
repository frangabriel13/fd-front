import s from "./ProtectedRoute.module.css";

const ProtectedRoute = ({ allowedRoles, userRole, children }) => {
  if(!allowedRoles.includes(userRole)) {
    return <div>Access Denied</div>;
  }

  return (
    <div className={s.container}>
      {children}
    </div>
  );
}


export default ProtectedRoute;
const ProtectedRouyte = ({ allowedRoles, userRole, children }) => {
  if(!allowedRoles.includes(userRole)) {
    return <div>Access Denied</div>;
  }

  return (
    <div>
      {children}
    </div>
  );
}


export default ProtectedRouyte;
import TableUsers from "./TableUsers";
import s from "./Users.module.css";

const Users = () => {
  return (
    <div className={s.container}>
      <TableUsers />
    </div>
  );
};


export default Users;
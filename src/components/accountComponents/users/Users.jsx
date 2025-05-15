import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllUsers } from "../../../store/actions/adminActions";
import TableUsers from "./TableUsers";
import s from "./Users.module.css";

const Users = () => {
  const dispatch = useDispatch();
  const { manufacturers, total, totalPages, page } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllUsers(page));
  }, [dispatch, page]);
 
  return (
    <div className={s.container}>
      <TableUsers manufacturers={manufacturers} />
    </div>
  );
};


export default Users;
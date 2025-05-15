import { useState } from "react";
import Pagination from "../../Pagination/Pagination";
import s from "./TableUsers.module.css";

const TableUsers = ({ manufacturers, total, totalPages, page, onPageChange }) => {

  return(
    <div className={s.container}>
      <h3>Usuarios</h3>
      <table className={s.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Estado</th>
            <th className={s.thActions}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {manufacturers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.manufacturer.name}</td>
              <td>{user.email}</td>
              <td>{user.manufacturer.verificationStatus}</td>
              <td className={s.tdActions}>
                <button className={s.btnVerify}>Verificar</button>
                <button className={s.btnEdit}>Editar</button>
                <button className={s.btnDelete}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={page}
        totalProducts={total}
        pageSize={15} // o el valor que uses como límite
        onPageChange={onPageChange}
      />
    </div>
  );
};


export default TableUsers;
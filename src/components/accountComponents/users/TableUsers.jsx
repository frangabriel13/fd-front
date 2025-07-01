import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../../store/actions/adminActions";
import { deleteProductsByUserId } from "../../../store/actions/productActions";
import Pagination from "../../Pagination/Pagination";
import EditManufacturer from "./EditManufacturer";
import VerifyUser from "./VerifyUser";
import { FaWhatsapp, FaEdit, FaTrash } from "react-icons/fa";
import PropTypes from 'prop-types';
import s from "./TableUsers.module.css";

const TableUsers = ({ manufacturers, total, totalPages, page, onPageChange }) => {
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState(null);

  const handleOpenModal = (user, type) => {
    setSelectedUser(user);
    setModalType(type);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setModalType(null);
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      await dispatch(deleteProductsByUserId(id));
      dispatch(deleteUser(id));
    }
  };

  const handleContactWhatsApp = (user) => {
    if (user.manufacturer && user.manufacturer.phone) {
      let phone = user.manufacturer.phone;
      // Agregar código de país si no lo tiene
      if (!phone.startsWith('+')) {
        phone = '+54' + phone;
      }
      const message = `Hola`;
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    } else {
      alert('Este usuario no tiene número de teléfono registrado.');
    }
  };
  
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
          {manufacturers.length === 0 ? (
            <tr>
              <td colSpan={5}>Cargando...</td>
            </tr>
          ) : (
            manufacturers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.manufacturer ? user.manufacturer.name : '-'}</td>
                <td>{user.email}</td>
                <td>{user.manufacturer ? user.manufacturer.verificationStatus : '-'}</td>
                <td className={s.tdActions}>
                  {user.manufacturer && user.manufacturer.verificationStatus === "pending" && (
                    <button
                      className={s.btnVerify}
                      onClick={() => handleOpenModal(user, 'verify')}
                    >
                      Verificar
                    </button>
                  )}
                  <button
                    className={s.btnWhatsapp}
                    onClick={() => handleContactWhatsApp(user)}
                    title="Contactar por WhatsApp"
                  >
                    <FaWhatsapp />
                  </button>
                  <button
                    className={s.btnEdit}
                    onClick={() => handleOpenModal(user, 'edit')}
                    title="Editar usuario"
                  >
                    <FaEdit />
                  </button>
                  <button 
                    className={s.btnDelete}
                    onClick={() => handleDeleteUser(user.id)}
                    title="Eliminar usuario"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          )}
      </tbody>
      </table>
      <Pagination
        currentPage={page}
        totalProducts={total}
        pageSize={15}
        onPageChange={onPageChange}
      />
      {modalType === 'verify' && selectedUser && (
        <VerifyUser 
          user={selectedUser}
          onClose={handleCloseModal}
        />
      )}
      {modalType === 'edit' && selectedUser && (
        <EditManufacturer 
          user={selectedUser}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

TableUsers.propTypes = {
  manufacturers: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  totalPages: PropTypes.number,
  page: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default TableUsers;
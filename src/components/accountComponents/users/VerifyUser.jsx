import { useState } from "react";
import { useDispatch } from "react-redux";
import { verifyUser } from "../../../store/actions/adminActions";
import s from "./VerifyUser.module.css";

const VerifyUser = ({ user, onClose }) => {
  const dispatch = useDispatch();
  const [expandedImg, setExpandedImg] = useState(null);

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={s.modal} onClick={handleClickOutside}>
      <div className={s.modalContent}>
        <div className={s.container}>
          <div className={s.divHeader}>
            <h3>Verificar cuenta</h3>
            <div className={s.divInfo}>
              <div className={s.infoItem}>
                <span className={s.infoLabel}>Marca:</span>
                <span className={s.infoValue}>{user.manufacturer.name}</span>
              </div>
              <div className={s.infoItem}>
                <span className={s.infoLabel}>Nombre:</span>
                <span className={s.infoValue}>{user.manufacturer.owner}</span>
              </div>
              <div className={s.infoItem}>
                <span className={s.infoLabel}>Teléfono:</span>
                <span className={s.infoValue}>{user.manufacturer.phone}</span>
              </div>
            </div>
          </div>
          <div className={s.divCredentials}>
            <img
              className={s.img}
              src={user.manufacturer.dniFront}
              alt={user.manufacturer.name}
              onClick={() => setExpandedImg(user.manufacturer.dniFront)}
              style={{ cursor: "pointer" }}
            />
            <img
              className={s.img}
              src={user.manufacturer.dniBack}
              alt={user.manufacturer.name}
              onClick={() => setExpandedImg(user.manufacturer.dniBack)}
              style={{ cursor: "pointer" }}
            />
            <img
              className={s.img}
              src={user.manufacturer.selfie}
              alt={user.manufacturer.selfie}
              onClick={() => setExpandedImg(user.manufacturer.selfie)}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className={s.divBtn}>
            <button
              className={s.btnForm}
              onClick={() => {
                dispatch(verifyUser(user.manufacturer.id));
                onClose();
              }}
            >
              Verificar
            </button>
            <button className={s.btnCancel} onClick={onClose}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
      {expandedImg && (
        <div className={s.expandedOverlay} onClick={() => setExpandedImg(null)}>
          <img className={s.expandedImg} src={expandedImg} alt="Expandida" />
        </div>
      )}
    </div>
  )
};


export default VerifyUser;
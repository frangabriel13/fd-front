import { useDispatch } from "react-redux";
import { verifyUser } from "../../../store/actions/adminActions";
import s from "./VerifyUser.module.css";

const VerifyUser = ({ user, onClose }) => {
  const dispatch = useDispatch();

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  console.log('user', user);

  return (
    <div className={s.modal} onClick={handleClickOutside}>
      <div className={s.modalContent}>
        <div className={s.container}>
          <div className={s.divHeader}>
            <h3>Verificar cuenta</h3>
            <p>Verifica las credenciales de {user.manufacturer.name}</p>
          </div>
          <div className={s.divCredentials}>
            <img className={s.img} src={user.manufacturer.dniFront} alt={user.manufacturer.name} />
            <img className={s.img} src={user.manufacturer.dniBack} alt={user.manufacturer.name} />
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
    </div>
  )
};


export default VerifyUser;
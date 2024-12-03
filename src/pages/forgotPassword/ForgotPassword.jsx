import s from './ForgotPassword.module.css';
import { FcGoogle } from "react-icons/fc";

const ForgotPassword = () => {
  return (
    <div className={s.container}>
      <div className={s.divTitle}>
        <h2 className={s.title}>ingresa tu e-mail para recuperar tu contraseña</h2>
        <p className={s.info}>Se te enviará un correo al e-mail especificado con el enlace para resetear la contraseña</p>
      </div>
      <div className={s.divForm}>
        <form className={s.form}>
          <div className={s.divInput}>
            <h3>E-mail</h3>
            <input type="email" placeholder="Email" className={s.input} />
          </div>
          <button type="submit" className={s.button}>Enviar</button>
        </form>
      </div>
    </div>
  )
};


export default ForgotPassword;
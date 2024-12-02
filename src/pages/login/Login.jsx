import s from './Login.module.css';

const Login = () => {
  return (
    <div className={s.container}>
      <div className={s.divTitle}>
        <h2 className={s.title}>ingresa tu e-mail y contraseña para iniciar sesión</h2>
      </div>
      <div className={s.divForm}>
        <form className={s.form}>
          <div className={s.divInput}>
            <h3>E-mail</h3>
            <input type="email" placeholder="Email" className={s.input} />
          </div>
          <div className={s.divInput}>
            <h3>Contraseña</h3>
            <input type="password" placeholder="Contraseña" className={s.input} />
          </div>
          <button type="submit" className={s.button}>Ingresar</button>
        </form>
        <div className={s.divBtns}>
          <button className={s.btnForgot}>¿Olvidaste tu contraseña?</button>
          <button className={s.btnCreate}>Crear cuenta</button>
          <button>Iniciar sesión con Google</button>
        </div>
      </div>
    </div>
  );
};


export default Login;
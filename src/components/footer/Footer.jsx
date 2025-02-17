import s from './Footer.module.css';

const Footer = () => {
  return (
    <div className={s.container}>
      <div className={s.divMenu}>
        <h3 className={s.title}>Menu</h3>
        <ul className={s.ul}>
          <li className={s.li}>Inicio</li>
          <li className={s.li}>Categorías</li>
          <li className={s.li}>Tienda</li>
          <li className={s.li}>Fabricantes</li>
        </ul>
      </div>
      <div className={s.divInfo}>
        <h3 className={s.title}>Información</h3>
        <ul className={s.ul}>
          <li className={s.li}>Acerca de</li>
          <li className={s.li}>Cómo Comprar</li>
          <li className={s.li}>Términos y Condiciones</li>
          <li className={s.li}>Política de Privacidad</li>
        </ul>
      </div>
      <div className={s.divSocial}>
        <ul className={s.ul}>
          <li className={s.li}>Instagram</li>
          <li className={s.li}>Linkedin</li>
          <li className={s.li}>TikTok</li>
        </ul>
        <div>
          <h3 className={s.title}>Descarga nuestra app</h3>
        </div>
      </div>
    </div>
  )
}


export default Footer;
import Feature from './Feature';
import s from './Features.module.css';
import { BsTruck } from "react-icons/bs";
import { BsCash } from "react-icons/bs";
import { BsWhatsapp } from "react-icons/bs";

const Features = () => {
  return (
    <div className={s.container}>
      <Feature icon={<BsTruck />} title="Envíos" description="Envíos a todo el país." />
      <Feature icon={<BsCash />} title="Pagos" description="Varios métodos de pago." />
      <Feature icon={<BsWhatsapp />} title="Soporte" description="Atención personalizada." />
    </div>
  )
};


export default Features;
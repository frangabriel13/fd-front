import Feature from './Feature';
import s from './Features.module.css';
import { BsTruck } from "react-icons/bs";
import { BsCash } from "react-icons/bs";
import { BsWhatsapp } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

const Features = () => {
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate('/preguntas-frecuentes');
  };

  const handleSoporteClick = () => {
    const phoneNumber = '541130415773';
    const message = 'Hola, necesito ayuda.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className={s.container}>
      <Feature 
        icon={<BsTruck />} 
        title="Envíos" description="Envíos a todo el país."
        onClick={handleViewMore}
      />
      <Feature 
        icon={<BsCash />} 
        title="Pagos" description="Varios métodos de pago."
        onClick={handleViewMore} 
      />
      <Feature 
        icon={<BsWhatsapp />} 
        title="Soporte" description="Atención personalizada."
        onClick={handleSoporteClick}
      />
    </div>
  )
};


export default Features;
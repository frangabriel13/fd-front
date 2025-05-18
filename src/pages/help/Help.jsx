import s from './Help.module.css';
import { BsWhatsapp } from "react-icons/bs";

const Help = () => {
  return (
    <div className={s.container}>
      <div className={s.divHeader}>
        <h2 className={s.title}>Preguntas frecuentes</h2>
      </div>
      <div className={s.divFAQ}>
        <div className={s.FAQ}>
          <div className={s.question}>
            <h3>¿Hacen envíos?</h3>
            <p>
              ¡Sí! Hacemos envíos a todo el país. El costo del envío está a cargo del cliente y 
              trabajamos con varias empresas de envío.
            </p>
          </div>
          <div className={s.question}>
            <h3>¿Cuáles son los medios de pago?</h3>
            <p>
              Puedes pagar por transferencia o depósito bancario, o en efectivo en el local. 
              Una vez acreditado el pago, despachamos o entregamos el pedido, ¡y no antes!
            </p>
          </div>
          <div className={s.question}>
            <h3>¿Cuánto cuesta el envío?</h3>
            <p>
              El costo depende de la empresa de envío que elijas y del peso del paquete, 
              por lo tanto, no podemos decirte el costo exacto. 📦
            </p>
          </div>
          <div className={s.question}>
            <h3>¿Debo pagar el costo del envío por adelantado?</h3>
            <p>
              Por lo general, se paga cuando el cliente recibe el paquete. 📦
            </p>
          </div>
          <div className={s.question}>
            <h3>¿Cuál es la compra mínima?</h3>
            <p>
              La compra mínima dependerá de cada fabricante. Lee la franja naranja 
              en la parte superior de la pantalla de cada fabricante para más información.
            </p>
          </div>
          <div className={s.question}>
            <h3>¿Puedo pasar por el local a comprar?</h3>
            <p>
              Sí, puedes pasar y elegir los modelos y tallas que necesites. Sin embargo, 
              recomendamos realizar la compra desde la app para asegurarte el stock de la mercadería.
            </p>
          </div>
        </div>
        <div className={s.contact}>
          <p>¿Necesitas más información? ¡Contáctanos en Fabricante Directo!</p>
          <button className={s.btnWsp}>
            <BsWhatsapp className={s.iconWsp} />
            WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};


export default Help;
import s from './Stepper.module.css';
import { BsArrowLeft } from 'react-icons/bs';

const Stepper = ({ steps, activeStep, onBack }) => {
  return (
    <div className={s.container}>
      <button
        onClick={onBack}
        disabled={activeStep === 0}
        className={s.backButton}
      >
        <BsArrowLeft className={s.icon} />
      </button>
    </div>
  );
};


export default Stepper;
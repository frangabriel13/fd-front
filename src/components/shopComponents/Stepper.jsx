import s from './Stepper.module.css';

const Stepper = ({ steps, activeStep }) => {
  return (
    <div className={s.container}>
      {/* {steps.map((label, idx) => (
        <div key={label} className={s.stepWrapper}>
          <div
            className={
              idx < activeStep
                ? s.completed
                : idx === activeStep
                ? s.active
                : s.inactive
            }
          >
            {idx + 1}
          </div>
          <span className={s.label}>{label}</span>
          {idx < steps.length - 1 && <div className={s.line} />}
        </div>
      ))} */}
    </div>
  );
};

export default Stepper;
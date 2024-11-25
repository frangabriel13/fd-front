import s from './Feature.module.css';

const Feature = ({ icon, title, description }) => {
  return (
    <div className={s.container}>
      <div className={s.icon}>
        {icon}
      </div>
      <div className={s.information}>
        <h3 className={s.title}>{title}</h3>
        <p className={s.description}>{description}</p>
      </div>
    </div>
  );
};


export default Feature;
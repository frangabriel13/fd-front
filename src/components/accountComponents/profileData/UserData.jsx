import s from './UserData.module.css';

const UserData = ({ user }) => {
  return (
    <div className={s.container}>
      <h3>Mis datos</h3>
      <div className={s.divData}>
        <div className={s.divInput}>
          <h4>Email</h4>
          <p>{user.email}</p>
        </div>
      </div>
    </div>
  )
};


export default UserData;
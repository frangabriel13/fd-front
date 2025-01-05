import ManufacturerData from './profileData/ManufacturerData';
import UserData from './profileData/UserData';
import s from './Profile.module.css';

const Profile = ({ user }) => {
  return (
    <div className={s.container}>
      <UserData user={user} />
      <ManufacturerData user={user} />
    </div>
  )
};


export default Profile;
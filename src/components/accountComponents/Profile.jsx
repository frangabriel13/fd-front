import ManufacturerData from './profileData/ManufacturerData';
import UserData from './profileData/UserData';
import s from './Profile.module.css';

const Profile = () => {
  return (
    <div className={s.container}>
      <UserData />
      <ManufacturerData />
    </div>
  )
};


export default Profile;
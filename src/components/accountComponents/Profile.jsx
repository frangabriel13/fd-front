import ManufacturerData from './profileData/ManufacturerData';
import UserData from './profileData/UserData';
import WholesalerData from './profileData/WholesalerData';
import s from './Profile.module.css';

const Profile = ({ user }) => {
  return (
    <div className={s.container}>
      <UserData user={user} />
      {
        user.role === 'manufacturer' && (
          <ManufacturerData user={user} />
        )
      }
      {
        user.role === 'wholesaler' && (
          <WholesalerData user={user} />
        )
      }
    </div>
  )
};


export default Profile;
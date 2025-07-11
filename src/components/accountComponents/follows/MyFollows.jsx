import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  followManufacturer, 
  unfollowManufacturer, 
  getFollowedManufacturers 
} from '../../../store/actions/userActions';
import s from './MyFollows.module.css';
import TableFollows from './TableFollows';

const MyFollows = () => {
  const dispatch = useDispatch();
  const { followed = [], loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getFollowedManufacturers());
  }, [dispatch]);

  const handleUnfollow = (manufacturerId) => {
    dispatch(unfollowManufacturer(manufacturerId));
  };

  return (
    <div className={s.container}>
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <TableFollows follows={followed} onUnfollow={handleUnfollow} />
      )}
    </div>
  )
};


export default MyFollows;
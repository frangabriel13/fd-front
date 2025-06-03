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
  const { followed } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getFollowedManufacturers());
  }, [dispatch]);

  return (
    <div className={s.container}>
      <TableFollows />
    </div>
  )
};


export default MyFollows;
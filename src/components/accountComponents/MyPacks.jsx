import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPacksByUserId } from '../../store/actions/packActions';
import s from './MyPacks.module.css';
import TableMyPacks from './myPacks/TableMyPacks';

const MyPacks = ({ myProducts }) => {
  const dispatch = useDispatch();
  const myPacks = useSelector(state => state.pack.myPacks);

  useEffect(() => {
    dispatch(getPacksByUserId());
  }, [dispatch]);
  
  return (
    <div className={s.container}>
      <TableMyPacks myPacks={myPacks} myProducts={myProducts} />
    </div>
  );
};


export default MyPacks;
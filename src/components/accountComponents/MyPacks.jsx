import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPacksByUserId } from '../../store/actions/packActions';
import s from './MyPacks.module.css';
import TableMyPacks from './myPacks/TableMyPacks';

const MyPacks = () => {
  const dispatch = useDispatch();
  const myPacks = useSelector(state => state.pack.myPacks);

  useEffect(() => {
    dispatch(getPacksByUserId());
  }, [dispatch]);
  
  console.log('myPacks', myPacks);
  return (
    <div className={s.container}>
      <h1>My Packs</h1>
    </div>
  );
};


export default MyPacks;
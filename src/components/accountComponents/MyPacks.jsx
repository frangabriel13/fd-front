import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPacksByUserId, deletePack } from '../../store/actions/packActions';
import s from './MyPacks.module.css';
import TableMyPacks from './myPacks/TableMyPacks';

const MyPacks = ({ myProducts }) => {
  const dispatch = useDispatch();
  const myPacks = useSelector(state => state.pack.myPacks);

  useEffect(() => {
    dispatch(getPacksByUserId());
  }, [dispatch]);

  const handleDeletePack = (packId) => {
    dispatch(deletePack(packId));
  };
  
  return (
    <div className={s.container}>
      <TableMyPacks myPacks={myPacks} myProducts={myProducts} onDelete={handleDeletePack} />
    </div>
  );
};


export default MyPacks;
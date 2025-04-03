import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import s from "./PackDetail.module.css";
import { getPackById } from "../../store/actions/packActions";
import { formatPrice } from "../../utils/utils";
import DataPack from "../../components/detailPack/DataPack";

const PackDetail = () => {
  const { packId } = useParams();
  const dispatch = useDispatch();
  const { pack, loading, error } = useSelector((state) => state.pack);

  useEffect(() => {
    dispatch(getPackById(packId));
  }, [dispatch, packId]);

  if(loading || !pack) {
    return <div>Loading...</div>;
  };

  if(error) {
    return <div>{error}</div>;
  }

  return (
    <div className={s.container}>
      <div className={s.divHeader}>
        <p>Compra mínima de por mayor en el mismo fabricante</p>
      </div>
      <div className={s.divDetail}>
        <DataPack pack={pack} />
      </div>
    </div>
  )
};


export default PackDetail;
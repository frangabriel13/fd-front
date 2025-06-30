import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import s from "./PackDetail.module.css";
import { getPackById } from "../../store/actions/packActions";
import { addToCart } from "../../store/actions/cartActions";
import { formatPrice } from "../../utils/utils";
import DataPack from "../../components/detailPack/DataPack";
import MoreProducts from "../../components/productRow/MoreProducts";

const PackDetail = () => {
  const { packId } = useParams();
  const dispatch = useDispatch();
  const { pack, loading, error } = useSelector((state) => state.pack);

  useEffect(() => {
    dispatch(getPackById(packId));
  }, [dispatch, packId]);

  const handleAddToCart = () => {
    const item = {
      packId: pack.id,
      quantity: 1,
    };
    dispatch(addToCart(item, pack.userId, "pack"));
  }

  if(loading || !pack) {
    return <div>Loading...</div>;
  };

  if(error) {
    return <div>{error}</div>;
  }

  console.log(pack);

  return (
    <div className={s.container}>
      <div className={s.divHeader}>
        <p>Compra mínima de {formatPrice(pack.manufacturer.minPurchase)} en {pack.manufacturer.name}</p>
      </div>
      <div className={s.divDetail}>
        <DataPack pack={pack} onAddToCart={handleAddToCart} />
      </div>
      <div className={s.divMoreProducts}>
        <MoreProducts 
          userId={pack.userId}
          manufacturerName={pack.manufacturer.name}
          manufacturerId={pack.manufacturer.id}
          manufacturerLogo={pack.manufacturer.logo}
        />
      </div>
    </div>
  )
};


export default PackDetail;
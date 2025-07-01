import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserData } from '../../store/actions/storeActions';
import { followManufacturer, unfollowManufacturer } from '../../store/actions/userActions';
import s from './Store.module.css';
import Products from '../../components/productStore/Products';
import Pagination from '../../components/pagination/Pagination';
import Reviews from '../../components/reviews/Reviews';
import HeaderStore from '../../components/shopping/HeaderStore';
import ReviewsMobile from '../../components/reviews/ReviewsMobile';
import {
  BsStar,
  BsStarHalf,
  BsStarFill,
  BsInstagram,
  BsTiktok,
  BsWhatsapp,
} from "react-icons/bs";
import { FaRegShareFromSquare } from "react-icons/fa6";
import SuccessModal from '../../components/modals/SuccessModal';
import { shareWspLink } from '../../utils/utils';
import useWindowWidth from '../../hooks/useWindowWidth';

const Store = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const width = useWindowWidth();
  const { user } = useSelector((state) => state.auth);
  const { manufacturer } = useSelector(state => state.manufacturer);
  const { manufacturerProducts, manufacturerCurrentPage, manufacturerTotalProducts } = useSelector(state => state.product);
  const pageSize = 18; // Tamaño de la página fijo
  const [sortOrder, setSortOrder] = useState('newest');
  const [isFollowed, setIsFollowed] = useState(manufacturer.isFollowed);
  const [followersCount, setFollowersCount] = useState(manufacturer.followersCount);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true); // <-- Añadido para mostrar el loader antes de pedir los datos
    dispatch(getUserData(userId, 1, pageSize, sortOrder)).finally(() => {
      setLoading(false); // <-- Oculta el loader cuando termina la petición
    });
  }, [dispatch, userId, pageSize, sortOrder]);

  useEffect(() => {
  setIsFollowed(manufacturer.isFollowed);
  setFollowersCount(manufacturer.followersCount);
}, [manufacturer.isFollowed, manufacturer.followersCount]);

  const handlePageChange = (page) => {
    dispatch(getUserData(userId, page, pageSize, sortOrder));
  };

  const handleSortChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
    dispatch(getUserData(userId, 1, pageSize, newSortOrder));
  };

  const handleFollow = async () => {
    if (!user || user.role !== 'wholesaler') {
      setShowModal(true);
      return;
    }
    if (isFollowed) {
      await dispatch(unfollowManufacturer(manufacturer.id));
      setIsFollowed(false);
      setFollowersCount(followersCount - 1);
    } else {
      await dispatch(followManufacturer(manufacturer.id));
      setIsFollowed(true);
      setFollowersCount(followersCount + 1);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating === null || rating === undefined) {
        stars.push(<BsStar key={i} className={s.star} />); // Estrellas vacías
      } else if (rating >= i) {
        stars.push(<BsStarFill key={i} className={s.star} />);
      } else if (rating >= i - 0.5) {
        stars.push(<BsStarHalf key={i} className={s.star} />);
      } else {
        stars.push(<BsStar key={i} className={s.star} />);
      }
    }
    return stars;
  };

  if (loading) {
  return (
    <div className={s.container}>
      <p>Cargando datos del fabricante...</p>
    </div>
  );
}

  console.log('Manufacturer:', manufacturer);

  return (
    <div className={s.container}>
      {width < 768 ? (
        <HeaderStore 
          manufacturer={manufacturer}
          followersCount={followersCount}
          isFollowed={isFollowed}
          handleFollow={handleFollow}
          renderStars={renderStars}
        />
      ) : (
      <div className={s.divHeader}>
        <div className={s.divTitle}>
          <div className={s.divLogo}>
            <img 
              src={manufacturer.image} 
              alt={manufacturer.name} 
              className={s.imgLogo}
            />
            <h2 className={s.name}>{manufacturer.name}</h2>
          </div>
          <div className={s.divRating}>
            <div className={s.divStars}>
              {renderStars(manufacturer.averageRating)}
            </div>
            <p className={s.averageRating}>
              {manufacturer.averageRating !== null && manufacturer.averageRating !== undefined
                ? manufacturer.averageRating.toFixed(1)
                : 'Sin calificar'}
            </p>
          </div>
        </div>
        { manufacturer.description && (
          <div className={s.divDescription}>
            <p className={s.description}>{manufacturer.description}</p>
          </div>
        )}
          <div className={s.divData}>
            <div className={s.divSocial}>
              {manufacturer.instagramNick && (
                <a
                href={`https://instagram.com/${manufacturer.instagramNick}`}
                target="_blank"
                rel="noopener noreferrer"
                className={s.iconShare}
                title="Instagram"
                >
                  <BsInstagram />
                </a>
              )}
              {manufacturer.tiktokUrl && (
                <a
                href={manufacturer.tiktokUrl.replace(/\/live$/, '')}
                target="_blank"
                rel="noopener noreferrer"
                className={s.iconShare}
                title="TikTok"
                >
                  <BsTiktok />
                </a>
              )}
              <FaRegShareFromSquare className={s.iconShare} onClick={() => shareWspLink(window.location.href)} />
            </div>
            <div className={s.divFollow}>
              <p className={s.followers}>{followersCount} seguidores</p>
              <button className={s.btnFollow} onClick={handleFollow}>
                {isFollowed ? 'Dejar de seguir' : 'Seguir'}
              </button>
            </div>
          </div>
        </div>
      )}
      {width < 768 ? (
        <ReviewsMobile 
          reviews={manufacturer.reviews || []} 
          manufacturerId={manufacturer.id}
          onRefresh={() => dispatch(getUserData(userId, 1, pageSize, sortOrder))}
        />
      ) : (
        <Reviews 
          reviews={manufacturer.reviews || []} 
          manufacturerId={manufacturer.id}
          onRefresh={() => dispatch(getUserData(userId, 1, pageSize, sortOrder))}
        />
      )}
      <div className={s.divProducts}>
        <Products 
          // products={manufacturerProducts} 
          products={manufacturerProducts || []}
          onSortChange={handleSortChange}
          manufacturerId={manufacturer.id}
          minPurchase={manufacturer.minPurchase}
          image={manufacturer.image}
        />
        <Pagination 
          currentPage={manufacturerCurrentPage} 
          totalProducts={manufacturerTotalProducts} 
          pageSize={pageSize} 
          onPageChange={handlePageChange}
        />
      </div>
      {showModal && (
        <SuccessModal 
          title="Acción no permitida"
          show={showModal} 
          onClose={() => setShowModal(false)} 
          message="Registrate como mayorista para seguir a fabricantes."
        />
      )}
    </div>
  );
};


export default Store;
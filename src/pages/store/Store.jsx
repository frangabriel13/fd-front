import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserData } from '../../store/actions/storeActions';
import s from './Store.module.css';
import Products from '../../components/productStore/Products';
import Pagination from '../../components/pagination/Pagination';
import Reviews from '../../components/reviews/Reviews';
import {
  BsStar,
  BsStarHalf,
  BsStarFill,
} from "react-icons/bs";

const Store = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { manufacturer } = useSelector(state => state.manufacturer);
  const { manufacturerProducts, manufacturerCurrentPage, manufacturerTotalProducts } = useSelector(state => state.product);
  const pageSize = 18; // Tamaño de la página fijo
  const [sortOrder, setSortOrder] = useState('newest');

  // Estado local para seguidores
  const [followers, setFollowers] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    dispatch(getUserData(userId, 1, pageSize, sortOrder));
  }, [dispatch, userId, pageSize, sortOrder]);

  const handlePageChange = (page) => {
    dispatch(getUserData(userId, page, pageSize, sortOrder));
  };

  const handleSortChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
    dispatch(getUserData(userId, 1, pageSize, newSortOrder));
  };

  // Manejar el botón de seguir/dejar de seguir
  const handleFollowToggle = () => {
    if (isFollowing) {
      setFollowers(followers - 1);
    } else {
      setFollowers(followers + 1);
    }
    setIsFollowing(!isFollowing);
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

  return (
    <div className={s.container}>
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
        {/* <div className={s.divData}>
          <p className={s.followers}>1.123 seguidores</p>
          <button className={s.btnFollow}>Seguir</button>
        </div> */}
        <div className={s.divData}>
          <p className={s.followers}>{followers} seguidores</p>
          <button className={s.btnFollow} onClick={handleFollowToggle}>
            {isFollowing ? 'Dejar de seguir' : 'Seguir'}
          </button>
        </div>
      </div>
      <Reviews 
        reviews={manufacturer.reviews} 
        manufacturerId={manufacturer.id}
        onRefresh={() => dispatch(getUserData(userId, 1, pageSize, sortOrder))}
      />
      <div className={s.divProducts}>
        <Products 
          products={manufacturerProducts} 
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
    </div>
  );
};


export default Store;
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import s from './Reviews.module.css';
import Review from './Review';
import CreateReview from './CreateReview';
import { createReview } from '../../store/actions/reviewActions';

const Reviews = ({ reviews, manufacturerId, onRefresh }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateReview = async (reviewData) => {
    const response = await dispatch(createReview(manufacturerId, reviewData));
    if(response.success) {
      onRefresh();
      setIsModalOpen(false);
    } else {
      console.error('Error al crear la reseña:', response.error);
    }
  }

  return (
    <div className={s.container}>
      <div className={s.divTitle}>
        <h2>Últimas reviews</h2>
        <div className={s.divButton}>
          <button className={s.btnReview} onClick={handleOpenModal}>Calificar</button>
        </div>
        <button className={s.btnMore}>Ver más</button>
      </div>
      <div className={s.divReviews}>
        {reviews.map((review, index) => (
          <Review key={index} review={review} />
        ))}
      </div>
      {isModalOpen && (
        <CreateReview
          manufacturerId={manufacturerId}
          onClose={handleCloseModal}
          onSubmit={handleCreateReview}
        />
      )}
    </div>
  )
};


export default Reviews;
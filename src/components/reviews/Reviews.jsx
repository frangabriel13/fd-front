import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import s from './Reviews.module.css';
import Review from './Review';
import CreateReview from './CreateReview';
import EditReview from './EditReview';
import SuccessModal from '../modals/SuccessModal';
import { createReview, updateReview, deleteReview } from '../../store/actions/reviewActions';
import useWindowWidth from '../../hooks/useWindowWidth';
import AllReviews from './AllReviews';

const Reviews = ({ reviews, manufacturerId, onRefresh }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [reviewToEdit, setReviewToEdit] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const width = useWindowWidth();

  let reviewsToShow = 4; // default desktop
  if (width <= 480) {
    reviewsToShow = 2; // mobile
  } else if (width <= 1024) {
    reviewsToShow = 3; // ipad/tablet
  }

  const handleOpenModal = () => {
    if (!user || user.role !== 'wholesaler') {
      setIsSuccessModalOpen(true);
      return;
    }

    const existingReview = reviews.find(
      (review) => review.user.id === user.userId
    );

    if(existingReview) {
      setReviewToEdit(existingReview);
      setIsEditModalOpen(true);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setReviewToEdit(null);
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
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

  const handleUpdateReview = async (reviewData) => {
    const response = await dispatch(updateReview(reviewToEdit.id, reviewData));
    if(response.success) {
      onRefresh();
      setIsEditModalOpen(false);
      setReviewToEdit(null);
    } else {
      console.error('Error al actualizar la reseña:', response.error);
    }
  }

  const handleDeleteReview = async (reviewId) => {
    const response = await dispatch(deleteReview(reviewId));
    if(response.success) {
      onRefresh();
    }
    else {
      console.error('Error al eliminar la reseña:', response.error);
    }
  }

  const handleShowAllReviews = () => {
    setShowAllReviews(true);
  };

  const handleCloseAllReviews = () => {
    setShowAllReviews(false);
  };

  return (
    <div className={s.container}>
      <div className={s.divTitle}>
        <h2>Últimas reviews</h2>
        <div className={s.divButton}>
          <button className={s.btnReview} onClick={handleOpenModal}>Calificar</button>
        </div>
        <button className={s.btnMore} onClick={handleShowAllReviews}>Ver más</button>
      </div>
      <div className={s.divReviews}>
        {reviews
          .slice(0, reviewsToShow)
          .map((review, index) => (
            <Review 
              key={index} 
              review={review}
              isEditable={user?.userId === review.user.id}
              onEdit={() => {
                setReviewToEdit(review);
                setIsEditModalOpen(true);
              }}
              onDelete={() => handleDeleteReview(review.id)}
            />
        ))}
      </div>
      {isModalOpen && (
        <CreateReview
          manufacturerId={manufacturerId}
          onClose={handleCloseModal}
          onSubmit={handleCreateReview}
        />
      )}
      {isEditModalOpen && reviewToEdit && (
        <EditReview
          review={reviewToEdit}
          onClose={handleCloseEditModal}
          onUpdate={handleUpdateReview}
        />
      )}
      {isSuccessModalOpen && (
        <SuccessModal
          title="Acción no permitida"
          message="Registrate como mayorista para calificar fabricantes."
          onClose={handleCloseSuccessModal}
          showContactButton={false}
        />
      )}
      {showAllReviews && (
        <AllReviews 
          reviews={reviews}
          onClose={handleCloseAllReviews}
          onEdit={(review) => {
            setReviewToEdit(review);
            setIsEditModalOpen(true);
          }}
          onDelete={handleDeleteReview}
        />
      )}
    </div>
  )
};


export default Reviews;
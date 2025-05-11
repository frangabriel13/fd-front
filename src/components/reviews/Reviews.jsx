import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import s from './Reviews.module.css';
import Review from './Review';
import CreateReview from './CreateReview';
import { createReview } from '../../store/actions/reviewActions';

const Reviews = ({ reviews, manufacturerId }) => {
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
      // console.log('Reseña creada con éxito:', response.data);
      setIsModalOpen(false);
    } else {
      console.error('Error al crear la reseña:', response.error);
    }
  }

  return (
    <div className={s.container}>
      <h2>Últimas reviews</h2>
      <div className={s.container}>
        <div>
          <button onClick={handleOpenModal}>Hacer una review</button>
        </div>
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
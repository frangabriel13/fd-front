import { useState } from 'react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import s from './Reviews.module.css';
import Review from './Review';
import CreateReview from './CreateReview';

const Reviews = ({ reviews, manufacturerId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
        />
      )}
    </div>
  )
};


export default Reviews;
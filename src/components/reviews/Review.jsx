import s from './Review.module.css';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { FiEdit2 } from "react-icons/fi";
import { timeAgo } from '../../utils/utils';

const Review = ({ review, isEditable, onEdit }) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
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
      {isEditable && (
        <div className={s.editIcon} onClick={onEdit}>
          <FiEdit2 />
        </div>
      )}
      <div className={s.divStars}>
        <div className={s.divRating}>
          {renderStars(review.rating)}
        </div>
      </div>
      <div className={s.divComment}>
        <p className={s.comment}>{review.comment}</p>
      </div>
      <div className={s.divFooter}>
        <h5>De: {review.user.wholesaler.name}</h5>
        <p>Hace {timeAgo(review.createdAt)}</p>
      </div>
    </div>
  )
};


export default Review;
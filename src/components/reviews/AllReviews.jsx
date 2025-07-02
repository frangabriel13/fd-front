import s from './AllReviews.module.css';
import { BsStar, BsStarFill, BsStarHalf, BsXLg } from 'react-icons/bs';
import { FiEdit2 } from "react-icons/fi";
import { timeAgo } from '../../utils/utils';

const AllReviews = ({ reviews, onEdit, onDelete, onClose }) => {
  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

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
    <div className={s.modal} onClick={handleClickOutside}>
      <div className={s.modalContent}>
        <div className={s.container}>
          <div className={s.divTitle}>
            <h3>Todas los comentarios</h3>
          </div>
          <div className={s.divReviews}>
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index} className={s.reviewItem}>
                  <div className={s.reviewHeader}>
                    <div className={s.stars}>{renderStars(review.rating)}</div>
                    {/* {onEdit && onDelete && (
                      <div className={s.actions}>
                        <span className={s.editIcon} onClick={() => onEdit(review)} title="Editar">
                          <FiEdit2 />
                        </span>
                        <span className={s.deleteIcon} onClick={() => onDelete(review)} title="Eliminar">
                          <BsXLg />
                        </span>
                      </div>
                    )} */}
                  </div>
                  <div className={s.commentSection}>
                    <p className={s.comment}>{review.comment}</p>
                  </div>
                  <div className={s.reviewFooter}>
                    <span className={s.userName}>De: {review.user?.wholesaler?.name || 'Usuario'}</span>
                    <span className={s.date}>Hace {timeAgo(review.createdAt)}</span>
                  </div>
                </div>
              ))
            ) : (
              <p>No hay reviews disponibles.</p>
            )}
          </div>
          <div className={s.divBtn}>
            <button onClick={onClose}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default AllReviews;
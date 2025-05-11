import { useState } from 'react';
import s from './CreateReview.module.css';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';

const EditReview = ({ review, onClose, onUpdate }) => {
  const [reviewData, setReviewData] = useState({
    rating: review.rating || 0,
    comment: review.comment || ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData({
      ...reviewData,
      [name]: value
    });
    if (name === 'rating' && value > 0) {
      setError(''); // Limpia el mensaje de error si el rating es válido
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reviewData.rating < 1) {
      setError('Por favor, selecciona una calificación.');
      return;
    }
    onUpdate(reviewData); // Llama a la función de actualización
  };

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={s.modal} onClick={handleClickOutside}>
      <div className={s.modalContent}>
        <div className={s.container}>
          <div className={s.divTitle}>
            <h3>Editar review</h3>
            <p>Actualiza tu calificación y comentario.</p>
          </div>
          <form className={s.form} onSubmit={handleSubmit}>
            <div className={s.ratingContainer}>
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <label key={index}>
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      onChange={handleChange}
                      checked={ratingValue === reviewData.rating}
                      style={{ display: 'none' }}
                    />
                    {ratingValue <= reviewData.rating ? (
                      <BsStarFill className={s.star} />
                    ) : (
                      <BsStar className={s.star} />
                    )}
                  </label>
                );
              })}
            </div>
            {error && <p className={s.error}>{error}</p>}
            <textarea
              className={s.textarea}
              name="comment"
              value={reviewData.comment}
              onChange={handleChange}
              placeholder="Actualiza tu comentario aquí..."
            ></textarea>
            <hr className={s.divider} />
            <div className={s.divBtn}>
              <button type="button" className={s.btnCancel} onClick={onClose}>Cancelar</button>
              <button type="submit" className={s.btnSubmit}>Actualizar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


export default EditReview;
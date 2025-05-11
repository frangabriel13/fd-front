import { useState } from 'react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import s from './Reviews.module.css';
import Review from './Review';

const Reviews = ({ reviews }) => {
  console.log('reviews', reviews);

  return (
    <div className={s.container}>
      <h2>Reviews</h2>
      <div className={s.container}>
        {reviews.map((review, index) => (
          <Review key={index} review={review} />
        ))}
      </div>
    </div>
  )
};


export default Reviews;
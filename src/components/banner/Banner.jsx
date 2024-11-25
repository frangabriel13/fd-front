import { useState, useEffect } from 'react';
import s from './Banner.module.css';
import image1 from '../../assets/banner1.png';
import image2 from '../../assets/banner2.png';
import image3 from '../../assets/banner3.png';
import image4 from '../../assets/banner4.png';
import image5 from '../../assets/banner5.png';

const Banner = () => {
  const images = [image1, image2, image3, image4, image5];
  const [index, setIndex] = useState(0);
  const [resetInterval, setResetInterval] = useState(false);

  useEffect(() => { 
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length, resetInterval]);

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    setResetInterval((prev) => !prev);
  };

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
    setResetInterval((prev) => !prev);
  };

  return (
    <div className={s.container}>
      <button onClick={handlePrev} className={s.prevButton}>&lt;</button>
      <button onClick={handleNext} className={s.nextButton}>&gt;</button>
      {
        images.map((image, i) => (
          <div key={i} className={`${s.slide} ${i === index ? s.active : ''}`}>
            <img src={image} alt={`Banner ${i + 1}`} className={s.image} />
          </div>
        ))
      }
      <div className={s.indicators}>
        {images.map((_, i) => (
          <span key={i} className={`${s.indicator} ${i === index ? s.active : ''}`}>_</span>
        ))}
      </div>
    </div>
  );
};


export default Banner;
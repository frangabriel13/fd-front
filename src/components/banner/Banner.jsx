import { useState, useEffect } from 'react';
import s from './Banner.module.css';
import banner1 from '../../assets/bannerOne.png';
import banner2 from '../../assets/bannerTwo.png';
import banner3 from '../../assets/bannerThree.png';
import banner4 from '../../assets/bannerFour.png';
import { GrNext, GrPrevious } from "react-icons/gr";

const Banner = () => {
  // const images = [image1, image2, image3, image4, image5];
  const images = [banner1, banner2, banner3, banner4];
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
        <button onClick={handlePrev} className={s.prevButton}>
          <GrPrevious />
        </button>
        <button onClick={handleNext} className={s.nextButton}>
          <GrNext />
        </button>
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
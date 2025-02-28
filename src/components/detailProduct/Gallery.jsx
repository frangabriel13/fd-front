import { useState } from 'react';
import { useEffect } from 'react';
import s from './Gallery.module.css';

const Gallery = ({ images, mainImage, name }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const mainImageIndex = images.findIndex(image => image === mainImage);
    if (mainImageIndex !== -1) {
      setSelectedImage(mainImageIndex);
    }
  }, [mainImage, images]);

  return (
    <div className={s.container}>
      <div className={s.divImages}>
        {images && images.map((image, index) => (
          <img 
            key={index} 
            className={`${s.otherImage} ${index === selectedImage ? s.selected : ''}`} 
            src={image} 
            alt={name}
            onClick={() => setSelectedImage(index)}
          />
        ))}
      </div>
      <div className={s.mainImage}>
        <img className={s.image} src={images[selectedImage]} alt={name} />
      </div>
    </div>
  );
};


export default Gallery;
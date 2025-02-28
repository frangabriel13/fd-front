import s from './Gallery.module.css';

const Gallery = ({ images }) => {
  return (
    <div className={s.container}>
      <div className={s.divImages}>
        {images && images.map((image, index) => (
          <img key={index} className={s.otherImage} src={image} alt="product" />
        ))}
      </div>
      <div className={s.mainImage}>
        <img className={s.image} src={images[0]} alt="product" />
      </div>
    </div>
  );
};


export default Gallery;
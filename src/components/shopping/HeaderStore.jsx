import s from './HeaderStore.module.css';
import {
  BsStar,
  BsStarHalf,
  BsStarFill,
  BsInstagram,
  BsTiktok,
} from "react-icons/bs";

const HeaderStore = ({ manufacturer, followersCount, isFollowed, handleFollow, renderStars, shareWspLink }) => {
  return (
    <div className={s.container}>
      <div className={s.divData}>
        <div className={s.divProfile}></div>
        <div className={s.divSocial}></div>
      </div>
      <div className={s.divDescription}>
        <div className={s.description}></div>
        <div className={s.divRating}></div>
      </div>
    </div>
  );
};


export default HeaderStore;
import s from './HeaderStore.module.css';
import {
  BsInstagram,
  BsTiktok,
  BsWhatsapp,
} from "react-icons/bs";
import { shareWspLink } from '../../utils/utils';

const HeaderStore = ({ manufacturer, followersCount, isFollowed, handleFollow, renderStars, onStarsClick }) => {
  return (
    <div className={s.container}>
      <div className={s.divData}>
        <div className={s.divProfile}>
          <div className={s.divImage}>
            {manufacturer.live && manufacturer.tiktokUrl ? (
              <a
                href={manufacturer.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ cursor: 'pointer' }}
              >
                <img src={manufacturer.image} alt={manufacturer.name} className={s.imgLogo} />
              </a>
            ) : (
              <img src={manufacturer.image} alt={manufacturer.name} className={s.imgLogo} />
            )}
            {manufacturer.live && <div className={s.live}>LIVE</div>}
          </div>
          <h2 className={s.name}>{manufacturer.name}</h2>
        </div>
        <div className={s.divSocial}>
          <div className={s.divFollow}>
            <div className={s.divFollowers}>
              <p className={s.followersCount}>{followersCount}</p>
              <p className={s.followersText}>Seguidores</p>
            </div>
            <div className={s.divActions}>
              <button 
                className={`${s.btnFollow} ${isFollowed ? s.following : ''}`} 
                onClick={handleFollow}
              >
                {isFollowed ? 'Siguiendo' : 'Seguir'}
              </button>
              <button className={s.btnShare} onClick={() => shareWspLink(window.location.href)}>
                Compartir
              </button>
            </div>
          </div>
          <div className={s.divNetwork}>
            {manufacturer.instagramNick && (
              <a
              href={`https://instagram.com/${manufacturer.instagramNick}`}
              target="_blank"
              rel="noopener noreferrer"
              className={s.iconShare}
              title="Instagram"
              >
                <BsInstagram className={s.iconSocial} />
              </a>
            )}
            {manufacturer.tiktokUrl && (
              <a
              href={manufacturer.tiktokUrl.replace(/\/live$/, '')}
              target="_blank"
              rel="noopener noreferrer"
              className={s.iconShare}
              title="TikTok"
              >
                <BsTiktok className={s.iconSocial} />
              </a>
            )}
            <button
              type="button"
              className={s.iconShare}
              title="Compartir por WhatsApp"
              onClick={() => {
                if (manufacturer.phone) {
                  // Agregar +54 si no está presente
                  let phoneNumber = manufacturer.phone.replace(/\D/g, ''); // Remover caracteres no numéricos
                  if (!phoneNumber.startsWith('54')) {
                    phoneNumber = `54${phoneNumber}`;
                  }
                  const wspUrl = `https://wa.me/${phoneNumber}`;
                  window.open(wspUrl, '_blank');
                }
              }}
            >
              <BsWhatsapp className={s.iconSocial} />
            </button>
          </div>
        </div>
      </div>
      <div className={s.divDescription}>
        {manufacturer.description && (
          <p className={s.description}>{manufacturer.description}</p>
        )}
        <div className={s.divRating}>
          <div>
            <p className={s.pRating}>Calificación de los usuarios:</p>
          </div>
          <div className={s.divRatingStars}>
            <div className={s.divStars} onClick={onStarsClick} style={{ cursor: 'pointer' }}>
              {renderStars(manufacturer.averageRating)}
            </div>
            <p className={s.averageRating}>
              {manufacturer.averageRating !== null && manufacturer.averageRating !== undefined
                ? manufacturer.averageRating.toFixed(1)
                : 'Sin calificar'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default HeaderStore;
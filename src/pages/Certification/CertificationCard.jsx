import React from 'react';
import '../../styles/components/CertificationCard.css';
import { useNavigate } from 'react-router-dom';

export default function CertificationCard({ certification = {} }) {
  const navigate = useNavigate();

  const {
    id,
    title = 'Certification',
    category = 'Adventure / Outdoor',
    image,
    rating,            // e.g., 4.8
    reviewsCount,      // e.g., 124
    duration,          // e.g., "3 days"
    location,          // e.g., "Goa, India"
    provider,          // e.g., "PADI Center"
    level,             // e.g., "Beginner"
    spotsLeft,         // number
    price,             // number
    currency = '₹',
  } = certification || {};

  // Free fallback image (Unsplash, no attribution required)
  const FALLBACK_IMG =
    'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1600&auto=format&fit=crop';
  const imgSrc = image || FALLBACK_IMG;

  const handleOpen = () => {
    if (id !== undefined && id !== null) {
      navigate(`/certifications/${id}`);
    }
  };

  return (
    <article
      className="certCard"
      role="button"
      tabIndex={0}
      onClick={handleOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleOpen();
        }
      }}
      aria-label={`View details for ${title}`}
    >
      {/* Media */}
      <div className="certCard__media">
        <img className="certCard__img" src={imgSrc} alt={title} loading="lazy" />
        <div className="certCard__badges">
          <span className="badge badge--soft">{category}</span>
          {level && <span className="badge badge--strong">{level}</span>}
        </div>
        {(rating || reviewsCount) && (
          <div className="certCard__rating">
            <span className="certCard__ratingStar">★</span>
            {typeof rating === 'number' && (
              <span className="certCard__ratingValue">{Number(rating).toFixed(1)}</span>
            )}
            {typeof reviewsCount === 'number' && (
              <span className="certCard__ratingCount">({reviewsCount})</span>
            )}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="certCard__body" onClick={(e) => e.stopPropagation()}>
        <h3 className="certCard__title" title={title}>{title}</h3>
        <ul className="certCard__meta">
          {duration && <li>⏱ {duration}</li>}
          {location && <li>📍 {location}</li>}
          {provider && <li>🏆 {provider}</li>}
          {typeof spotsLeft === 'number' && (
            <li>👥 {spotsLeft > 0 ? `${spotsLeft} spots left` : 'Waitlist open'}</li>
          )}
        </ul>

        <div className="certCard__footer">
          <div className="certCard__priceWrap">
            {typeof price === 'number' ? (
              <>
                <span className="certCard__amount">
                  {currency}
                  {Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(price)}
                </span>
                <span className="certCard__per">/ course</span>
              </>
            ) : (
              <span className="certCard__muted">Pricing varies</span>
            )}
          </div>

          <button className="certCard__btn" type="button" onClick={handleOpen}>
            View Details
          </button>
        </div>
      </div>

      {/* Hover accent */}
      <div className="certCard__accent" />
    </article>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import '../../styles/components/CertificationDetail.css';

export default function CertificationDetail({ certification, onRegister }) {
  if (!certification) return <div className="certification-detail">No certification found.</div>;

  const fallbackImg =
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop';

  const title = certification.title || 'Certification';
  const desc = certification.description || 'Detailed information will be available soon.';
  const category = certification.category || 'General';
  const requirements = certification.requirements || 'Not specified';
  const duration = certification.duration || '3–7 days';
  const price = typeof certification.price === 'number' ? certification.price : 0;
  const currency = certification.currency || '₹';
  const location = certification.location || 'Multiple locations';
  const level = certification.level || 'All Levels';
  const rating = typeof certification.rating === 'number' ? certification.rating.toFixed(1) : null;
  const reviews = certification.reviewsCount || null;
  const provider = certification.provider || 'Adventure Triangle';

  return (
    <motion.article
      className="certification-detail"
      aria-labelledby="certification-title"
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <motion.img
        src={certification.image || fallbackImg}
        alt={title}
        className="certification-detail-img"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.src = fallbackImg;
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />

      <div className="certification-detail-content">
        <motion.h1
          id="certification-title"
          className="certification-detail-title"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          {title}
        </motion.h1>
        <motion.p
          className="certification-detail-desc"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          {desc}
        </motion.p>

        <motion.div
          className="certification-detail-info"
          aria-label="Key details"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div><b>Category:</b> {category}</div>
          <div><b>Duration:</b> {duration}</div>
          <div><b>Level:</b> {level}</div>
          <div><b>Location:</b> {location}</div>
          <div><b>Provider:</b> {provider}</div>
          <div><b>Requirements:</b> {requirements}</div>
          <div><b>Price:</b> {currency}{Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(price)}</div>
          {(rating || reviews) && (
            <div>
              <b>Rating:</b> {rating ? `${rating}★` : '—'} {reviews ? `(${reviews})` : ''}
            </div>
          )}
        </motion.div>

        <motion.button
          className="certification-detail-btn"
          onClick={onRegister}
          aria-label={`Enroll or pay for ${title}`}
          whileHover={{ scale: 1.05, backgroundColor: '#1565c0' }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          Enroll / Pay {currency}{Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(price)}
        </motion.button>
      </div>
    </motion.article>
  );
}
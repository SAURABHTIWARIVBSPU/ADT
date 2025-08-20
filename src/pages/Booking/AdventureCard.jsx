// AdventureCard.js
import { FaHeart, FaStar, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from '@clerk/clerk-react';
import "../../styles/components/AdventureCard.css";
import "../../styles/components/AdventureSlider.css";
export const WISHLIST_KEY = 'wishlist';

export default function AdventureCard({ adventure, layout = "grid" }) {
  const { user } = useUser();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showAdded, setShowAdded] = useState(false);
  const navigate = useNavigate();

  // Use a key that is unique per user (if signed in)
  const wishlistKey = user ? `wishlist_${user.id}` : 'wishlist_guest';

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
    setIsWishlisted(wishlist.some(item => item.id === adventure.id));
    // eslint-disable-next-line
  }, [adventure.id]);

  const toggleWishlist = (e) => {
    e.preventDefault();
    let wishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
    if (isWishlisted) {
      wishlist = wishlist.filter(item => item.id !== adventure.id);
      setIsWishlisted(false);
    } else {
      wishlist.push(adventure);
      setIsWishlisted(true);
      setShowAdded(true);
      setTimeout(() => setShowAdded(false), 1200);
    }
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  };

  return (
    <Link to={`/adventures/${adventure.id}`} className="adventure-card-link">
      <div className="adventure-card-image-container">
        <img
          src={adventure.image}
          alt={adventure.title}
          loading="lazy"
          className="adventure-card-image"
        />
        <div className="adventure-card-continent">
          {adventure.continent}
        </div>
        <div className="adventure-card-wishlist">
          <button onClick={toggleWishlist} className="wishlist-btn" aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}>
            <FaHeart color={isWishlisted ? 'red' : 'gray'} fill={isWishlisted ? 'red' : 'none'} size={22} />
          </button>
          {showAdded && <span className="wishlist-added-msg">Added to wishlist</span>}
        </div>
      </div>
      <div className="adventure-card-details">
        <h3 className="adventure-card-title">{adventure.title}</h3>
        <div className="adventure-card-location">
          <FaMapMarkerAlt />
          <span>{adventure.location}</span>
        </div>
        {layout !== "topRated" && (
          <div className="adventure-card-meta">
            <FaClock />
            <span>{adventure.duration}</span>
            <span>•</span>
            <span>{adventure.difficulty}</span>
          </div>
        )}
        <p className="adventure-card-price">{adventure.price}</p>
        <div className="adventure-card-rating-type">
          <FaStar />
          <span>{adventure.rating}</span>
          <span>{adventure.type}</span>
          {layout === "topRated" && adventure.rating >= 4.8 && (
            <span className="adventure-card-top-rated">
              Top Rated
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
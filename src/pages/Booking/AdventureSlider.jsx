// AdventureSlider.js
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRef, useEffect, useState } from "react";
import AdventureCard from "./AdventureCard";
import "../../styles/components/AdventureSlider.css";

export default function AdventureSlider({ adventures, title, viewAllLink }) {
  const sliderRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollInterval = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
      resetAutoScroll();
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
      resetAutoScroll();
    }
  };

  const resetAutoScroll = () => {
    setIsPaused(true);
    clearInterval(scrollInterval.current);
    setTimeout(() => {
      setIsPaused(false);
      startAutoScroll();
    }, 10000); // Resume after 10 seconds of inactivity
  };

  const startAutoScroll = () => {
    if (scrollInterval.current) clearInterval(scrollInterval.current);
    scrollInterval.current = setInterval(() => {
      if (!isPaused && sliderRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 50;
        
        if (isAtEnd) {
          // If at end, scroll back to start
          sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Otherwise scroll right
          sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
      }
    }, 5000); // Scroll every 5 seconds
  };

  useEffect(() => {
    startAutoScroll();
    return () => clearInterval(scrollInterval.current);
  }, [isPaused]);

  // Add 'featured' class if title is 'Featured Adventures'
  const isFeatured = title === 'Featured Adventures';

  return (
    <div 
      className={`adventure-slider${isFeatured ? ' featured' : ''}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="adventure-slider-header">
        <h3 className={`adventure-slider-title${isFeatured ? ' featured' : ''}`}>{title}</h3>
        {viewAllLink && (
          <a href="/adventures" className="adventure-slider-viewall">
            View All Adventures →
          </a>
        )}
      </div>

      <div className="adventure-slider-controls">
        <button onClick={scrollLeft} className="adventure-slider-btn">
          <FaChevronLeft />
        </button>

        <div 
          ref={sliderRef} 
          className="adventure-slider-scroll"
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setTimeout(() => setIsPaused(false), 5000)}
        >
          {adventures.map((adventure) => (
            <AdventureCard key={adventure.id} adventure={adventure} layout="slider" />
          ))}
        </div>

        <button onClick={scrollRight} className="adventure-slider-btn">
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}
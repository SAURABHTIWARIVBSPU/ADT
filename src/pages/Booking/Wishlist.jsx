import React, { useEffect, useState } from 'react';
import AdventureCard, { WISHLIST_KEY } from '../../pages/Booking/AdventureCard';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
    setWishlist(stored);
  }, []);

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter(item => item.id !== id);
    setWishlist(updated);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
  };

  return (
    <div>
      <Header />
      <div className="wishlist-container" style={{ padding: '2vw', minHeight: '60vh' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#6366f1', marginBottom: '1rem' }}>My Wishlist</h2>
        <div style={{ color: '#6366f1', fontWeight: 600, marginBottom: '2rem', fontSize: '1.1rem' }}>
          Total: {wishlist.length} {wishlist.length === 1 ? 'adventure' : 'adventures'}
        </div>
        {wishlist.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#888', fontSize: '1.2rem', background: '#fffbe9', borderRadius: 12, padding: 32, maxWidth: 400, margin: '40px auto' }}>No adventures in your wishlist yet.</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {wishlist.map(adventure => (
              <div key={adventure.id} style={{ position: 'relative' }}>
                <AdventureCard adventure={adventure} />
                <button onClick={() => removeFromWishlist(adventure.id)} style={{ position: 'absolute', top: 10, right: 10, background: '#fff', color: '#f43f5e', border: '2px solid #f43f5e', borderRadius: 8, padding: '4px 12px', fontWeight: 700, cursor: 'pointer', zIndex: 3, boxShadow: '0 2px 8px rgba(244,63,94,0.13)' }}>Remove</button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
} 
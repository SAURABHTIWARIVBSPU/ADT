import { useEffect, useState } from 'react';
import '../../styles/components/MyBookings.css';
import { globalAdventureData } from '../../Data/data';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('myBookings') || '[]');
    setBookings(stored);
  }, []);

  if (!bookings.length) {
    return (
      <div>
        <Header />
        <div className="my-bookings-empty">No bookings found.</div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="my-bookings-container">
        <h2>My Bookings</h2>
        {bookings.map((b, i) => {
          const adventure = globalAdventureData.find(a => a.id === b.adventureId || a.id === Number(b.adventureId));
          return (
            <div key={i} className="my-booking-card">
              {adventure && (
                <div className="my-booking-adventure-info">
                  <img src={adventure.image} alt={adventure.title} className="my-booking-adventure-img" />
                  <div className="my-booking-adventure-details">
                    <div><b>Title:</b> {adventure.title}</div>
                    <div><b>Location:</b> {adventure.location}, {adventure.continent}</div>
                    <div><b>Type:</b> {adventure.type}</div>
                    <div><b>Duration:</b> {adventure.duration}</div>
                    <div><b>Difficulty:</b> {adventure.difficulty}</div>
                    <div><b>Price:</b> {adventure.price}</div>
                  </div>
                </div>
              )}
              <div className="my-booking-details-list">
                <div><b>Status:</b> <span className="my-booking-status-badge">{b.status}</span></div>
                <div><b>Persons:</b> {typeof b.persons === 'object' ? JSON.stringify(b.persons) : b.persons}</div>
                <div><b>Dates:</b> {b.dates ? JSON.stringify(b.dates) : (b.bookingDetails ? JSON.stringify(b.bookingDetails) : 'N/A')}</div>
                <div><b>Total Price:</b> ${b.totalPrice}</div>
                {b.certification && <div><b>Certification:</b> {typeof b.certification === 'object' ? JSON.stringify(b.certification) : b.certification}</div>}
                <div><b>User ID:</b> {b.userId}</div>
                <div><b>Adventure ID:</b> {b.adventureId}</div>
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
} 
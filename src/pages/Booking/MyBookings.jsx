import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import '../../styles/components/MyBookings.css';
import { globalAdventureData } from '../../data/mock/data';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await fetch(`http://localhost:5000/api/bookings?userId=${user?.id}`);
        if (!res.ok) throw new Error('Failed to load bookings');
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error(err);
        setBookings([]);
      }
    }
    if (user) fetchBookings();
  }, [user]);

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
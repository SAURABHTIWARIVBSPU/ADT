import React, { useEffect, useState } from 'react';
import { getAllBookings } from '../../Data/admin-data';

export default function BookingsSection() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    setBookings(getAllBookings());
  }, []);
  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#e11d48', marginBottom: 12 }}>All Bookings</h2>
      {bookings.length === 0 ? (
        <div style={{ color: '#888', background: '#fffbe9', borderRadius: 8, padding: 24, textAlign: 'center', marginBottom: 24 }}>No bookings found.</div>
      ) : (
        <div style={{ color: '#64748b' }}>
          <table style={{ width: '100%', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001', marginBottom: 24 }}>
            <thead>
              <tr style={{ background: '#f3f4f6' }}>
                <th>User ID</th>
                <th>Adventure ID</th>
                <th>Status</th>
                <th>Persons</th>
                <th>Dates</th>
                <th>Total Price</th>
                <th>Certification</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, i) => (
                <tr key={i} style={{ textAlign: 'center' }}>
                  <td>{b.userId}</td>
                  <td>{b.adventureId}</td>
                  <td>{b.status}</td>
                  <td>{typeof b.persons === 'object' ? JSON.stringify(b.persons) : b.persons}</td>
                  <td>{b.dates ? JSON.stringify(b.dates) : (b.bookingDetails ? JSON.stringify(b.bookingDetails) : 'N/A')}</td>
                  <td>${b.totalPrice}</td>
                  <td>{b.certification ? (typeof b.certification === 'object' ? JSON.stringify(b.certification) : b.certification) : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 
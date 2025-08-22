import React, { useEffect, useState } from 'react';
import { getTotalBookingAmount, getTotalCertificationAmount, getTotalAmount } from '../../data/mock/admin-data';

export default function AmountsSection() {
  const [booking, setBooking] = useState(0);
  const [cert, setCert] = useState(0);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setBooking(getTotalBookingAmount());
    setCert(getTotalCertificationAmount());
    setTotal(getTotalAmount());
  }, []);
  const noAmounts = booking === 0 && cert === 0 && total === 0;
  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#e11d48', marginBottom: 12 }}>All Amounts</h2>
      {noAmounts ? (
        <div style={{ color: '#888', background: '#fffbe9', borderRadius: 8, padding: 24, textAlign: 'center', marginBottom: 24 }}>No revenue data found.</div>
      ) : (
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001', padding: 24 }}>
          <div><b>Total Booking Revenue:</b> ${booking}</div>
          <div><b>Total Certification Revenue:</b> ${cert}</div>
          <div><b>Total Revenue:</b> ${total}</div>
        </div>
      )}
    </div>
  );
} 
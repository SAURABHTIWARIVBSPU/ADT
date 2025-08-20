import React, { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [pending, setPending] = useState([]);

  useEffect(() => {
    const adventures = JSON.parse(localStorage.getItem('pendingAdventures') || '[]');
    setPending(adventures.filter(a => a.status === 'pending'));
  }, []);

  const handleApprove = (id) => {
    let adventures = JSON.parse(localStorage.getItem('pendingAdventures') || '[]');
    const idx = adventures.findIndex(a => a.id === id);
    if (idx !== -1) {
      adventures[idx].status = 'approved';
      // Generate unique partner ID
      adventures[idx].partnerId = 'PID-' + Date.now() + '-' + Math.floor(Math.random() * 10000);
      localStorage.setItem('pendingAdventures', JSON.stringify(adventures));
      setPending(adventures.filter(a => a.status === 'pending'));
    }
  };
  const handleReject = (id) => {
    let adventures = JSON.parse(localStorage.getItem('pendingAdventures') || '[]');
    adventures = adventures.filter(a => a.id !== id);
    localStorage.setItem('pendingAdventures', JSON.stringify(adventures));
    setPending(adventures.filter(a => a.status === 'pending'));
  };

  return (
    <div style={{ maxWidth: 700, margin: '2rem auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0001', padding: 24 }}>
      <h2>Super Admin: Pending Adventures</h2>
      {pending.length === 0 && <p>No pending adventures.</p>}
      {pending.map(a => (
        <div key={a.id} style={{ border: '1px solid #eee', borderRadius: 8, margin: '1rem 0', padding: 16, display: 'flex', gap: 16 }}>
          <img src={a.mainImage} alt={a.title} style={{ width: 100, height: 80, objectFit: 'cover', borderRadius: 8, border: '1px solid #ddd' }} />
          <div style={{ flex: 1 }}>
            <h3>{a.title}</h3>
            <div><b>Location:</b> {a.location}</div>
            <div><b>Type:</b> {a.type}</div>
            <div><b>Price:</b> {a.price}</div>
            <div><b>Description:</b> {a.description}</div>
            <div><b>Partner Email:</b> {a.partnerEmail}</div>
            <div><b>Partner ID:</b> {a.partnerId}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button style={{ background: '#22c55e', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 18px', fontWeight: 600 }} onClick={() => handleApprove(a.id)}>Approve</button>
            <button style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 18px', fontWeight: 600 }} onClick={() => handleReject(a.id)}>Reject</button>
          </div>
        </div>
      ))}
    </div>
  );
}
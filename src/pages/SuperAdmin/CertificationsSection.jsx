import React, { useEffect, useState } from 'react';
import { getAllCertifications } from '../../data/mock/admin-data';

export default function CertificationsSection() {
  const [certifications, setCertifications] = useState([]);
  useEffect(() => {
    setCertifications(getAllCertifications());
  }, []);
  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#e11d48', marginBottom: 12 }}>All Certifications</h2>
      {certifications.length === 0 ? (
        <div style={{ color: '#888', background: '#fffbe9', borderRadius: 8, padding: 24, textAlign: 'center', marginBottom: 24 }}>No certifications found.</div>
      ) : (
        <div style={{ color: '#64748b' }}>
          <table style={{ width: '100%', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001', marginBottom: 24 }}>
            <thead>
              <tr style={{ background: '#f3f4f6' }}>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Certification Title</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {certifications.map((c, i) => (
                <tr key={i} style={{ textAlign: 'center' }}>
                  <td>{c.userId}</td>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.certificationTitle}</td>
                  <td>{new Date(c.date).toLocaleDateString()}</td>
                  <td>{c.status || 'Registered'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 
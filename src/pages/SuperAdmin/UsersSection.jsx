import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../data/mock/admin-data';

export default function UsersSection() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    setUsers(getAllUsers());
  }, []);
  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#e11d48', marginBottom: 12 }}>All Users</h2>
      {users.length === 0 ? (
        <div style={{ color: '#888', background: '#fffbe9', borderRadius: 8, padding: 24, textAlign: 'center', marginBottom: 24 }}>No users found.</div>
      ) : (
        <ul style={{ background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001', padding: 24 }}>
          {users.map((u, i) => (
            <li key={i} style={{ marginBottom: 8 }}>{u}</li>
          ))}
        </ul>
      )}
    </div>
  );
} 
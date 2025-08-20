import React from 'react';

export default function SuperAdminOnboarding() {
  return (
    <div style={{ maxWidth: 600, margin: '3rem auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0001', padding: 32 }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#e11d48', marginBottom: 24 }}>Superadmin Onboarding</h1>
      <p style={{ fontSize: '1.2rem', color: '#334155', marginBottom: 16 }}>
        Welcome, Superadmin! This is your dedicated onboarding flow. Here you can set up global settings, manage users, and configure the platform.
      </p>
      <ul style={{ fontSize: '1rem', color: '#475569', marginBottom: 24 }}>
        <li>• Review and approve pending adventures</li>
        <li>• Manage platform-wide settings</li>
        <li>• Access analytics and reports</li>
        <li>• Add or remove admins</li>
      </ul>
      <p style={{ color: '#64748b' }}>
        (This onboarding can be customized further as needed.)
      </p>
    </div>
  );
} 
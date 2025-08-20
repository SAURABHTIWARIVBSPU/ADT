import React, { useState } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { 
  FaTachometerAlt, 
  FaUsers, 
  FaMapMarkedAlt, 
  FaMoneyCheckAlt, 
  FaCheckCircle, 
  FaChartBar, 
  FaSignOutAlt, 
  FaCertificate,
  FaThList,
  FaMoneyBillWave,
  FaFileAlt,
  FaCog,
  FaUserShield
} from 'react-icons/fa';
import { useUser, SignedIn, SignedOut, SignIn } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import OverviewSection from '../SuperAdmin/OverviewSection';
import ActivitiesSection from '../SuperAdmin/ActivitiesSection';
import BookingsSection from '../SuperAdmin/BookingsSection';
import PayoutsSection from '../SuperAdmin/PayoutsSection';
import UsersSection from '../SuperAdmin/UsersSection';
import PartnersSection from '../SuperAdmin/PartnersSection';
import AmountsSection from '../SuperAdmin/AmountsSection';
import CertificationsSection from '../SuperAdmin/CertificationsSection';
import AnalyticsSection from '../SuperAdmin/AnalyticsSection';
import SettingsSection from '../SuperAdmin/SettingsSection';
import ContentCenterSection from '../SuperAdmin/ContentCenterSection';
import AddDemoDataButton from '../SuperAdmin/AddDemoDataButton';
import {
  getAllBookings,
  getAllUsers,
  getAllPartners,
  getTotalBookingAmount,
  getTotalCertificationAmount,
  getTotalAmount,
  getAllCertifications
} from '../../Data/admin-data';

const sidebarItems = [
  { label: 'Overview', icon: <FaTachometerAlt /> },
  { label: 'Partners', icon: <FaMapMarkedAlt /> },
  { label: 'Activities', icon: <FaThList /> },
  { label: 'Bookings', icon: <FaCheckCircle /> },
  { label: 'Payouts', icon: <FaMoneyBillWave /> },
  { label: 'Certifications', icon: <FaCertificate /> },
  { label: 'Analytics', icon: <FaChartBar /> },
  { label: 'Users & Admins', icon: <FaUserShield /> },
  { label: 'Content Center', icon: <FaFileAlt /> },
  { label: 'Settings / Logs', icon: <FaCog /> },
  { label: 'Logout', icon: <FaSignOutAlt /> },
];

export default function SuperAdminDashboard() {
  const [selected, setSelected] = useState(0);
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();

  if (!isSignedIn) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(90deg, #f8fafc 0%, #e0e7ef 100%)' }}>
        <div style={{ marginBottom: 40, textAlign: 'center' }}>
          <h1 style={{ fontSize: 48, fontWeight: 800, color: '#e11d48', marginBottom: 16 }}>SuperAdmin Portal</h1>
          <p style={{ fontSize: 18, color: '#64748b', marginBottom: 8 }}>Restricted Access - Admin Only</p>
          <p style={{ fontSize: 14, color: '#94a3b8' }}>Please sign in with authorized SuperAdmin email: <strong>adarshbalmukundshukla@gmail.com</strong></p>
        </div>
        <div style={{ background: '#fff', padding: 40, borderRadius: 16, boxShadow: '0 10px 40px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
          <SignIn />
        </div>
      </div>
    );
  }

  // Only allow superadmin (example: by email)
  if (user?.primaryEmailAddress?.emailAddress !== 'stw284701@gmail.com') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(90deg, #f8fafc 0%, #e0e7ef 100%)' }}>
        <div style={{ background: '#fff', padding: 60, borderRadius: 16, boxShadow: '0 10px 40px rgba(0,0,0,0.1)', textAlign: 'center', maxWidth: 500 }}>
          <div style={{ fontSize: 72, marginBottom: 24 }}>🚫</div>
          <h2 style={{ fontSize: 32, fontWeight: 700, color: '#e11d48', marginBottom: 16 }}>Access Denied</h2>
          <p style={{ fontSize: 18, color: '#64748b', marginBottom: 24 }}>SuperAdmin access is restricted to authorized personnel only.</p>
          <div style={{ background: '#fef2f2', padding: 20, borderRadius: 8, marginBottom: 24, border: '1px solid #fecaca' }}>
            <p style={{ fontSize: 14, color: '#7f1d1d', margin: 0 }}>
              <strong>Current user:</strong> {user?.primaryEmailAddress?.emailAddress}<br/>
              <strong>Required:</strong> stw284701@gmail.com
            </p>
          </div>
          <button 
            onClick={() => navigate('/')} 
            style={{ 
              background: 'linear-gradient(90deg, #e11d48 0%, #fbbf24 100%)', 
              color: '#fff', 
              padding: '12px 24px', 
              borderRadius: 8, 
              border: 'none', 
              fontSize: 16, 
              fontWeight: 600, 
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}  
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const handleSidebarClick = (idx) => {
    if (sidebarItems[idx].label === 'Logout') {
      navigate('/');
      return;
    }
    setSelected(idx);
  };

  // Dashboard summary data
  const bookings = getAllBookings();
  const users = getAllUsers();
  const partners = getAllPartners();
  const certifications = getAllCertifications();
  const totalBookingAmount = getTotalBookingAmount();
  const totalCertificationAmount = getTotalCertificationAmount();
  const totalAmount = getTotalAmount();

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(90deg, #f8fafc 0%, #e0e7ef 100%)' }}>
      <Header />
      <div style={{ display: 'flex', minHeight: '80vh' }}>
        {/* Sidebar */}
        <aside style={{ width: 260, background: '#fff', boxShadow: '2px 0 12px #0001', padding: '32px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {/* Superadmin Profile */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 32 }}>
            <img
              src={user?.imageUrl}
              alt={user?.fullName || 'Superadmin'}
              style={{ width: 70, height: 70, borderRadius: '50%', objectFit: 'cover', marginBottom: 10, border: '3px solid #e11d48', boxShadow: '0 2px 8px #e11d4822' }}
            />
            <div style={{ fontWeight: 700, color: '#e11d48', fontSize: 18 }}>{user?.fullName || 'Superadmin'}</div>
            <div style={{ color: '#64748b', fontSize: 14 }}>{user?.primaryEmailAddress?.emailAddress}</div>
          </div>
          {sidebarItems.map((item, idx) => (
            <button
              key={item.label}
              onClick={() => handleSidebarClick(idx)}
              style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: '12px 28px',
                background: selected === idx ? 'linear-gradient(90deg, #e11d48 0%, #fbbf24 100%)' : 'none',
                color: selected === idx ? '#fff' : '#334155',
                fontWeight: 600, fontSize: 17, border: 'none', borderRadius: 8, cursor: 'pointer', marginBottom: 6,
                boxShadow: selected === idx ? '0 2px 8px #e11d4822' : 'none',
                transition: 'all 0.2s',
              }}
            >
              <span style={{ fontSize: 22 }}>{item.icon}</span> {item.label}
            </button>
          ))}
        </aside>
        {/* Main Content */}
        <main style={{ flex: 1, padding: '40px 5vw', position: 'relative', zIndex: 1 }}>
          <AddDemoDataButton />
          {selected === 0 && <OverviewSection />}
          {selected === 1 && <PartnersSection />}
          {selected === 2 && <ActivitiesSection />}
          {selected === 3 && <BookingsSection />}
          {selected === 4 && <PayoutsSection />}
          {selected === 5 && <CertificationsSection />}
          {selected === 6 && <AnalyticsSection />}
          {selected === 7 && <UsersSection />}
          {selected === 8 && <ContentCenterSection />}
          {selected === 9 && <SettingsSection />}
        </main>
      </div>
      <Footer />
    </div>
  );
} 
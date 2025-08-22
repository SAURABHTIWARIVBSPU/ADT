import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { certifications } from '../../data/mock/certification-data';
import CertificationDetail from '../Certification/CertificationDetail';
import CertificationForm from '../Certification/CertificationForm';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { useUser, SignInButton } from '@clerk/clerk-react';

export default function CertificationDetailPage() {
  const { id } = useParams();
  const certification = certifications.find((c) => c.id === Number(id));
  const [showForm, setShowForm] = useState(false);
  const { isSignedIn, user } = useUser();

  const handleRegister = () => {
    if (!isSignedIn) {
      document.querySelector('#clerk-signin-btn')?.click();
      return;
    }
    setShowForm(true);
  };

  const handleSuccess = () => {
    setShowForm(false);
  };

  const headerBand = {
    background: 'linear-gradient(90deg, rgba(59,130,246,.12), rgba(99,102,241,.12), rgba(16,185,129,.12))',
    height: 4,
    width: '100%'
  };

  return (
    <div>
      <Header />

      {isSignedIn && user && <ProfileFloat user={user} />}

      <motion.div style={headerBand} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5 }} />

      <main style={{ maxWidth: 1120, margin: '0 auto', padding: '2rem 1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24 }}>
          <section>
            <AnimatePresence mode="wait">
              {!showForm ? (
                <motion.div key="detail" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                  <CertificationDetail certification={certification} onRegister={handleRegister} />
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                  <CertificationForm certification={certification} onSuccess={handleSuccess} />
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* profile panel moved to top near header as a single icon */}
        </div>
      </main>

      <Footer />
    </div>
  );
}

function ProfileFloat({ user }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: 'fixed', top: 12, right: 16, zIndex: 1000 }}>
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.98 }}
        aria-expanded={open}
        aria-label="Toggle profile details"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 40,
          height: 40,
          borderRadius: 12,
          border: '1px solid rgba(2,6,23,0.1)',
          background: 'linear-gradient(180deg, #ffffff, #f8fafc)',
          boxShadow: '0 10px 24px rgba(2,6,23,0.06)'
        }}
      >
        <span role="img" aria-label="user" style={{ fontSize: 18 }}>👤</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              right: 0,
              marginTop: 10,
              width: 280,
              background: '#fff',
              borderRadius: 14,
              border: '1px solid rgba(2,6,23,0.08)',
              boxShadow: '0 12px 40px rgba(2,6,23,0.12)',
              padding: 16
            }}
          >
            <div style={{ display: 'grid', gap: 8 }}>
              <div style={{ fontWeight: 800, color: '#0f172a' }}>{user.fullName}</div>
              <div style={{ color: '#475569', fontSize: 14 }}>{user.primaryEmailAddress?.emailAddress}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
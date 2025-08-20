import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { motion } from 'framer-motion'; // added for subtle motion (non-breaking)
import '../../styles/components/CertificationPayment.css';

export default function CertificationPayment() {
  const { state } = useLocation();
  const { registration, certification } = state || {};
  const { user } = useUser();
  const navigate = useNavigate();

  // ---- Time-of-day theme slot (Asia/Kolkata) ----
  const themeSlot = useMemo(() => {
    try {
      // Local user time (browser) – assume IST for slot boundaries
      const now = new Date();
      // Convert to IST offset if your app can vary by timezone, else use local.
      // Day slot: 06:00–16:59 (sunny), Evening: 17:00–23:59 & 00:00–05:59
      const hour = now.getHours();
      return hour >= 6 && hour < 17 ? 'day' : 'evening';
    } catch {
      return 'day';
    }
  }, []);

  // Robust certification fields from previous page
  const certTitle =
    certification?.title ||
    certification?.name ||
    registration?.certificationTitle ||
    'Certification';
  const certFee =
    certification?.fee ??
    certification?.price ??
    0;
  const certDuration =
    certification?.duration ||
    certification?.days ||
    certification?.length ||
    null;

  // Registration values from previous page
  const buyerName =
    registration?.name ||
    user?.fullName ||
    '';
  const buyerEmail =
    registration?.email ||
    user?.primaryEmailAddress?.emailAddress ||
    '';
  const buyerMessage = registration?.message || '';

  if (!registration || !certification) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="text-center text-slate-600">No certification to pay for.</div>
        </main>
        <Footer />
      </div>
    );
  }

  const handlePayment = () => {
    const myCerts = JSON.parse(localStorage.getItem('myCertifications') || '[]');
    const registrationWithStatus = {
      ...registration,
      status: 'confirmed',
      paid: true,
      paymentDate: new Date().toISOString(),
      amount: certFee,
      certificationTitle: certTitle,
    };
    myCerts.push(registrationWithStatus);
    localStorage.setItem('myCertifications', JSON.stringify(myCerts));
    navigate('/my-certifications');
  };

  return (
    <div className={`cp-page cp-${themeSlot}`}>
      {/* Animated background layers */}
      <div className="cp-bg" aria-hidden="true" />
      <div className="cp-orb cp-orb--a" aria-hidden="true" />
      <div className="cp-orb cp-orb--b" aria-hidden="true" />

      <Header />

      <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          className="cp-card"
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          whileHover={{ y: -3, scale: 1.01 }}
        >
          <span className="cp-glow-ring" aria-hidden="true" />

          <h2 className="cp-title">Certification Payment</h2>

          {/* Payment summary pulled from previous page */}
          <div className="cp-grid">
            <div className="cp-kv">
              <div className="cp-k">Certification</div>
              <div className="cp-v">{certTitle}</div>
            </div>
            <div className="cp-kv">
              <div className="cp-k">Fee</div>
              <div className="cp-v">₹{Number(certFee || 0).toLocaleString('en-IN')}</div>
            </div>
            {certDuration ? (
              <div className="cp-kv">
                <div className="cp-k">Duration</div>
                <div className="cp-v">{certDuration}</div>
              </div>
            ) : null}
            <div className="cp-divider" />
            <div className="cp-kv">
              <div className="cp-k">Name</div>
              <div className="cp-v">{buyerName || '—'}</div>
            </div>
            <div className="cp-kv">
              <div className="cp-k">Email</div>
              <div className="cp-v">{buyerEmail || '—'}</div>
            </div>
            {buyerMessage ? (
              <div className="cp-note">
                <div className="cp-note-h">Message</div>
                <div className="cp-note-b">{buyerMessage}</div>
              </div>
            ) : null}
          </div>

          <motion.button
            type="button"
            onClick={handlePayment}
            className="cp-pay-btn"
            whileTap={{ scale: 0.985 }}
          >
            Confirm &amp; Pay
          </motion.button>

          {/* Mini disclaimer / info */}
          <p className="cp-hint">
            By continuing you agree to the terms. Your certification will be added to “My Certifications” after payment.
          </p>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import '../../styles/components/CertificationForm.css';
import { useUser, SignedIn, SignedOut, SignIn } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CertificationForm({ certification = {}, onSuccess }) {
  const { user } = useUser();
  const navigate = useNavigate();

  // Ensure page starts at top when this form page opens
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [form, setForm] = useState({
    name: user?.fullName || '',
    email: user?.primaryEmailAddress?.emailAddress || '',
    message: '',
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const registration = {
      ...form,
      userId: user?.id,
      certificationId: certification.id,
      certificationTitle: certification.title,
      date: new Date().toISOString(),
    };
    navigate('/certification-payment', { state: { registration, certification } });
    onSuccess?.();
  };

  return (
    <div className="cf-only-page">
      {/* soft animated gradient bg */}
      <div className="cf-only-bg" aria-hidden="true" />

      <SignedOut>
        <div className="cf-only-wrap">
          <div className="cf-auth-note">
            <h2 className="cf-auth-title">Sign in to continue</h2>
            <p className="cf-muted">Please sign in to register.</p>
            <div className="cf-auth-widget"><SignIn /></div>
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="cf-only-wrap">
          <motion.form
            onSubmit={handleSubmit}
            className="cf-form cf-form--gradient"
            initial={{ opacity: 0, y: -24 }}     // ⬅️ slide from TOP
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28 }}
          >
            <label className="cf-field">
              <span className="cf-label">Name</span>
              <div className="cf-input-wrap">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="cf-input"
                  placeholder="Your full name"
                />
              </div>
            </label>

            <label className="cf-field">
              <span className="cf-label">Email</span>
              <div className="cf-input-wrap">
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="cf-input"
                  placeholder="you@example.com"
                />
              </div>
            </label>

            <label className="cf-field">
              <span className="cf-label">Message (optional)</span>
              <div className="cf-input-wrap">
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  className="cf-textarea"
                  placeholder="Anything we should know?"
                />
              </div>
            </label>

            <motion.button
              type="submit"
              className="cf-primary-btn"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.985 }}
            >
              Proceed to Payment
            </motion.button>
          </motion.form>
        </div>
      </SignedIn>
    </div>
  );
}

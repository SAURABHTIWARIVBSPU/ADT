import React, { useEffect, useState } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import '../../styles/components/MyCertifications.css';

export default function MyCertifications() {
  const [certifications, setCertifications] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('myCertifications') || '[]');
    setCertifications(stored);
  }, []);

  return (
    <div className="mc-page min-h-screen flex flex-col">
      {/* subtle animated gradient background */}
      <div className="mc-bg" aria-hidden="true" />

      <Header />

      <main className="mc-container flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mc-header">
          <h2 className="mc-title">My Certifications</h2>
          {certifications?.length > 0 && (
            <span className="mc-count" aria-label={`${certifications.length} certifications`}>
              {certifications.length}
            </span>
          )}
        </div>

        {(!certifications || certifications.length === 0) ? (
          <section className="mc-empty" role="status">
            <div className="mc-empty-blob" aria-hidden="true" />
            <h3>No certifications yet</h3>
            <p className="mc-muted">When you register for a certification, it’ll appear here.</p>
          </section>
        ) : (
          <section className="mc-grid">
            {certifications.map((c, i) => (
              <article key={i} className="mc-card">
                <div className="mc-card-top">
                  <h3 className="mc-card-title" title={c.certificationTitle || 'Certification'}>
                    {c.certificationTitle || 'Certification'}
                  </h3>
                  <span className="mc-pill mc-pill--ok">Registered</span>
                </div>

                <div className="mc-kv">
                  <div className="mc-kv-row">
                    <span className="mc-k">Date</span>
                    <span className="mc-v">
                      {c?.date ? new Date(c.date).toLocaleDateString() : '—'}
                    </span>
                  </div>
                  <div className="mc-kv-row">
                    <span className="mc-k">Participant</span>
                    <span className="mc-v">{c?.name || '—'}</span>
                  </div>
                  <div className="mc-kv-row">
                    <span className="mc-k">Email</span>
                    <span className="mc-v mc-clip" title={c?.email || ''}>
                      {c?.email || '—'}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

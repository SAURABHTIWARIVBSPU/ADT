// src/pages/Certification/CertificationGrid.jsx
import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { certifications } from '../../data/mock/certification-data';
import CertificationCard from '../Certification/CertificationCard';
import '../../styles/components/CertificationGrid.css';
import CertificationSearchBar from '../Certification/CertificationSearchBar';
import { useCertification } from '../../context/CertificationContext';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

export default function CertificationGrid() {
  const { searchTerm, activeCategory } = useCertification();

  const filteredCerts = useMemo(() => {
    const q = (searchTerm || '').trim().toLowerCase();
    return certifications.filter((c) => {
      const byCat = activeCategory === 'All' || c.category === activeCategory;
      const byQuery =
        !q ||
        c.title?.toLowerCase().includes(q) ||
        (c.description || '').toLowerCase().includes(q);
      return byCat && byQuery;
    });
  }, [activeCategory, searchTerm]);

  return (
    <div className="at-theme">
      <Header />

      {/* Subtle animated background */}
      <div className="at-bg-wrap" aria-hidden="true" />

      <div className="certification-grid-container">
        <motion.div
          className="at-topbar"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <h2 className="certification-grid-title">Adventure Certifications</h2>
        </motion.div>

        <motion.p
          className="at-sub"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
        >
          {activeCategory === 'All' ? 'All categories' : activeCategory} • {filteredCerts.length}
          {' '}result{filteredCerts.length === 1 ? '' : 's'}
        </motion.p>

        {/* Search */}
        <motion.div
          className="at-search-wrap text-black"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.08 }}
        >
          <CertificationSearchBar />
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          {filteredCerts.length === 0 ? (
            <motion.div
              key="empty"
              className="at-empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              No certifications available.
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              className="certification-grid"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
            >
              {filteredCerts.map((cert) => (
                <motion.div
                  key={cert.id}
                  className="at-card-wrap"
                  variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.25 }}
                >
                  <CertificationCard certification={cert} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
}

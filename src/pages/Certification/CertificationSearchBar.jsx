// src/pages/Certification/CertificationSearchBar.jsx
import React from 'react';
import { useCertification } from '../../context/CertificationContext';

export default function CertificationSearchBar() {
  const {
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
  } = useCertification();

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 220px',
    gap: 12,
    alignItems: 'center',
    background:
      'radial-gradient(800px 300px at 50% -60%, rgba(59,130,246,.10), rgba(255,255,255,0)),' +
      'linear-gradient(90deg, rgba(59,130,246,.04), rgba(16,185,129,.04))',
    border: '1px solid rgba(2,6,23,0.08)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
  };

  const inputWrapStyle = {
    position: 'relative',
    width: '100%'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 40px 12px 40px',
    borderRadius: 10,
    border: '1px solid #cbd5e1',
    background: '#ffffff',
    fontSize: 16,
    minHeight: 44,
    outline: 'none',
    color: '#0f172a',
  };

  const iconStyle = {
    position: 'absolute',
    left: 12,
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: 16,
    opacity: 0.8,
    pointerEvents: 'none'
  };

  const clearBtnStyle = {
    position: 'absolute',
    right: 8,
    top: '50%',
    transform: 'translateY(-50%)',
    height: 28,
    width: 28,
    borderRadius: 8,
    border: '1px solid #e2e8f0',
    background: '#ffffff',
    cursor: 'pointer',
    fontWeight: 700,
    color: '#334155'
  };

  const selectStyle = {
    width: '100%',
    padding: '12px 12px',
    borderRadius: 10,
    border: '1px solid #cbd5e1',
    background: '#ffffff',
    fontSize: 16,
    minHeight: 44,
    outline: 'none',
    cursor: 'pointer',
    color: '#0f172a',
  };

  return (
    <div style={containerStyle} role="search">
      {/* Ensure placeholder color is visible across browsers */}
      <style>{`
        #cert-search-input::placeholder{color:#64748b;opacity:.9}
        #cert-search-input:-ms-input-placeholder{color:#64748b}
        #cert-search-input::-ms-input-placeholder{color:#64748b}
      `}</style>
      <div style={inputWrapStyle}>
        <span aria-hidden="true" style={iconStyle}>🔎</span>
        <input
          id="cert-search-input"
          type="text"
          placeholder="Search by title, category, or location…"
          value={searchTerm ?? ''}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={inputStyle}
          aria-label="Search certifications"
          onKeyDown={(e) => {
            if (e.key === 'Escape') setSearchTerm('');
          }}
        />
        {searchTerm ? (
          <button
            type="button"
            onClick={() => setSearchTerm('')}
            aria-label="Clear search"
            style={clearBtnStyle}
            title="Clear"
          >
            ×
          </button>
        ) : null}
      </div>

      <select
        value={activeCategory ?? 'All'}
        onChange={(e) => setActiveCategory(e.target.value)}
        style={selectStyle}
        aria-label="Filter by category"
        title="Filter by category"
      >
        <option value="All">All</option>
        <option value="Air">Air</option>
        <option value="Water">Water</option>
        <option value="Land">Land</option>
      </select>
    </div>
  );
}

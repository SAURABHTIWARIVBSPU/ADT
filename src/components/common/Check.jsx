import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function AdventureTourFeatures() {
  const [activeTab, setActiveTab] = useState('features');
  const [selectedCard, setSelectedCard] = useState(null);

  // Framer Motion variants
  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut', delay: 0.05 * i },
    }),
  };
  const scaleIn = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: (i = 0) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.45, ease: 'easeOut', delay: 0.07 * i },
    }),
  };

  const goBooking = () => {
    // No import changes: simple redirect
    window.location.href = '/booking';
  };

  // ---- Data for each tab (images/icons per card) ----
  const CARDS = {
    features: [
      {
        title: 'Adventure Booking',
        desc:
          'Create stunning tour packages for treks, climbs, and expeditions with flexible options.',
        grad: 'from-cyan-500 to-sky-700',
        accent: 'ring-cyan-300/40',
        img: '/images/booking.jpg', // put your real image here
        
      },
      {
        title: 'Live Itineraries',
        desc:
          'Real-time updates, weather alerts, and GPS tracking for outdoor adventures.',
        grad: 'from-emerald-500 to-teal-700',
        accent: 'ring-emerald-300/40',
        img: '/images/itinerary.jpg',
        
      },
      {
        title: 'Smart Check-in',
        desc: 'QR codes, digital waivers, and gear check for seamless starts.',
        grad: 'from-indigo-500 to-violet-700',
        accent: 'ring-indigo-300/40',
        img: '/images/checkin.jpg',
        
      },
    ],
    solutions: [
      {
        title: 'Group & Corporate',
        desc: 'Bulk quotes, approvals, and multi-itinerary coordination for teams.',
        grad: 'from-gray-500 to-sky-400',
        accent: 'ring-fuchsia-300/40',
        img: '/images/corporate.jpg',
        
      },
      {
        title: 'Guides & Roster',
        desc: 'Auto-assign certified guides, manage shifts and availability calendars.',
        grad: 'from-amber-500 to-orange-700',
        accent: 'ring-amber-300/40',
        img: '/images/cards/guides.jpg',
        iconPath:
          'M16 7a4 4 0 11-8 0 4 4 0 018 0z M12 14c-4 0-7 2-7 4v3h14v-3c0-2-3-4-7-4z',
      },
      {
        title: 'Gear & Inventory',
        desc: 'Rentals, safety checks, and stock alerts integrated with bookings.',
        grad: 'from-lime-500 to-green-700',
        accent: 'ring-lime-300/40',
        img: '/images/cards/gear.jpg',
        iconPath:
          'M3 7h18M6 7v13a2 2 0 002 2h8a2 2 0 002-2V7',
      },
    ],
    integrations: [
      {
        title: 'Weather & Maps',
        desc: 'OpenWeather + Map tiles embedded for planning & on-trail use.',
        grad: 'from-sky-500 to-cyan-700',
        accent: 'ring-sky-300/40',
        img: '/images/cards/weather.jpg',
        iconPath:
          'M3 15a4 4 0 004 4h9a5 5 0 100-10 6 6 0 10-13 6z',
      },
      {
        title: 'Payments',
        desc: 'Stripe-ready checkout with coupons, holds, and partial pay.',
        grad: 'from-purple-500 to-indigo-700',
        accent: 'ring-purple-300/40',
        img: '/images/cards/payments.jpg',
        iconPath:
          'M2 7h20v10H2z M2 11h20 M6 15h2',
      },
      {
        title: 'CRM & Emails',
        desc: 'Sync with HubSpot/Zoho, send pre-trip packs & follow-ups.',
        grad: 'from-rose-500 to-red-700',
        accent: 'ring-rose-300/40',
        img: '/images/cards/crm.jpg',
        iconPath:
          'M4 4h16v12H4z M22 20H2v-4l6-4 6 4 8-5z',
      },
    ],
  };

  const cards = CARDS[activeTab];

  return (
    <section className="relative z-20 overflow-hidden">
      {/* === Animated Background (no images) === */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(1200px 800px at 50% -10%, rgba(56,189,248,0.18), transparent 60%), conic-gradient(from 220deg at 50% 40%, #0A0F1A 0%, #0C1423 45%, #0A0F1A 70%, #0C1423 100%)',
          }}
        />
        <div className="absolute -inset-x-10 -top-40 h-[60vh] opacity-70 blur-3xl">
          <div className="w-full h-full bg-[conic-gradient(from_90deg,#22d3ee_0%,#60a5fa_25%,#a78bfa_50%,#22d3ee_100%)] animate-aurora" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.07] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(#fff 1px, transparent 1px), radial-gradient(#fff 1px, transparent 1px)',
            backgroundSize: '22px 22px, 22px 22px',
            backgroundPosition: '0 0, 11px 11px',
          }}
        />
      </div>

      {/* Local keyframes */}
      <style>{`
        @keyframes aurora { 0%{transform:translateX(-10%) skewY(-3deg)} 50%{transform:translateX(10%) skewY(3deg)} 100%{transform:translateX(-10%) skewY(-3deg)} }
        @keyframes runner { 0%{transform:translateX(-30%)} 100%{transform:translateX(130%)} }
      `}</style>

      {/* Top / bottom runners */}
      <div className="absolute inset-x-0 top-0 h-[2px] overflow-hidden">
        <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-white to-transparent animate-[runner_6s_linear_infinite]" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[2px] overflow-hidden">
        <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-white to-transparent animate-[runner_7s_linear_infinite]" />
      </div>

      {/* === Content === */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <span className="inline-block px-3 py-1 text-xs md:text-sm font-bold text-cyan-50 bg-white/10 border border-white/15 rounded-full mb-4 backdrop-blur">
            HIMRAHI ADVENTURES TECH
          </span>

          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 via-sky-200 to-indigo-200">
              Elevate Your Adventure Tours
            </span>
          </h2>

          <p className="text-base sm:text-lg text-white/80 max-w-3xl mx-auto">
            Transform how you plan, manage, and deliver unforgettable outdoor experiences with our{' '}
            <span className="font-semibold text-white">adventure-specific</span> tour platform.
          </p>

          <div className="mt-6">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={goBooking}
              className="relative inline-flex items-center justify-center px-5 py-2.5 rounded-full font-semibold text-slate-900"
            >
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-400" />
              <span className="relative">Explore Everything → Booking</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Tabs with sliding pill (now actually switches cards) */}
        <motion.div
          className="flex justify-center mb-12"
          initial="hidden"
          animate="visible"
          custom={1}
          variants={fadeUp}
        >
          <div className="relative inline-flex rounded-2xl bg-white/10 border border-white/10 p-1 backdrop-blur">
            {/* sliding pill */}
            <motion.div
              key={activeTab}
              layout
              className="absolute top-1 bottom-1 rounded-xl bg-white/15"
              style={{
                left: activeTab === 'features' ? '4px' : activeTab === 'solutions' ? '33%' : '66%',
                width: '32%',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
            {['features', 'solutions', 'integrations'].map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`relative z-10 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition text-white ${
                  activeTab === key ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                }`}
              >
                {key === 'features' && 'Core Features'}
                {key === 'solutions' && 'Adventure Solutions'}
                {key === 'integrations' && 'Mountain Tech'}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Cards (with images/icons; click opens modal) */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={scaleIn}
              whileHover={{ y: -6 }}
              onClick={() => setSelectedCard(card)}
              className="group cursor-pointer rounded-3xl overflow-hidden bg-white/[.06] border border-white/10 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,.35)] transition"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedCard(card)}
            >
              {/* header band with background image */}
              <div className={`h-44 relative flex items-center justify-center bg-gradient-to-br ${card.grad}`}>
                {card.img ? (
                  <img
                    src={card.img}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity"
                    loading="lazy"
                  />
                ) : null}
                <div className={`absolute inset-0 ring-1 ${card.accent} rounded-b-[32px]`} />
                {/* Center icon (SVG) */}
                <svg
                  className="relative w-16 h-16 text-white drop-shadow"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d={card.iconPath} />
                </svg>
              </div>

              <div className="p-7">
                <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
                <p className="text-white/80 mb-6">{card.desc}</p>

                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      goBooking();
                    }}
                    className="relative inline-flex items-center justify-center px-4 py-2 rounded-lg font-semibold text-slate-900"
                  >
                    <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-white to-white/90" />
                    <span className="relative">Book now</span>
                  </motion.button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCard(card);
                    }}
                    className="text-white/80 hover:text-white underline-offset-4 hover:underline"
                  >
                    Learn more →
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="text-center rounded-3xl p-8 sm:p-12 shadow-xl border border-white/10 bg-gradient-to-r from-cyan-600/40 via-indigo-700/40 to-fuchsia-600/40 backdrop-blur-xl"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to Transform Your Adventure Tours?
            </h3>
            <p className="text-white/85 text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
              Join hundreds of adventure companies using Himrahi to deliver unforgettable outdoor experiences.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={goBooking}
                className="relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-bold text-slate-900"
              >
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-white to-white/90" />
                <span className="relative">Schedule a Demo</span>
              </motion.button>

              <motion.button
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={goBooking}
                className="relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-bold border border-white/20 text-white"
              >
                <span className="absolute inset-0 rounded-xl bg-white/0 hover:bg-white/10 transition" />
                <span className="relative">Explore Features</span>
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ===== Modal: Present selected card ===== */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* overlay */}
            <div
              className="absolute inset-0 bg-black/60"
              onClick={() => setSelectedCard(null)}
            />
            {/* dialog */}
            <motion.div
              role="dialog"
              aria-modal="true"
              className="relative w-full max-w-3xl rounded-3xl overflow-hidden bg-[#0D1220]/95 backdrop-blur-xl border border-white/10 shadow-2xl"
              initial={{ y: 24, scale: 0.98, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 12, scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
            >
              {/* hero image */}
              <div className={`relative h-56 bg-gradient-to-br ${selectedCard.grad}`}>
                {selectedCard.img && (
                  <img
                    src={selectedCard.img}
                    alt={selectedCard.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-70"
                  />
                )}
                <div className={`absolute inset-0 ring-1 ${selectedCard.accent}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1220] via-transparent to-transparent opacity-60" />
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedCard.title}</h3>
                    <p className="mt-2 text-white/80 max-w-2xl">{selectedCard.desc}</p>
                  </div>
                  <button
                    onClick={() => setSelectedCard(null)}
                    className="text-white/70 hover:text-white rounded-lg px-3 py-1 bg-white/10 hover:bg-white/20 transition"
                  >
                    Close
                  </button>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <motion.button
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={goBooking}
                    className="relative inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-semibold text-slate-900"
                  >
                    <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-white to-white/90" />
                    <span className="relative">Book Now</span>
                  </motion.button>

                  <button
                    onClick={() => setSelectedCard(null)}
                    className="text-white/85 hover:text-white underline-offset-4 hover:underline"
                  >
                    Keep browsing
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default AdventureTourFeatures;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mountain, Users, Handshake, Star, ArrowRight, Globe, Award, Zap } from 'lucide-react';

function Partner() {
  const [showHandshake, setShowHandshake] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setShowHandshake(true);
    setTimeout(() => navigate('/partner'), 2000);
  };

  // Adventure/outdoor brand logos with color variants (unchanged)
  const partnerLogos = [
    { url: "https://cdn.worldvectorlogo.com/logos/the-north-face-1.svg", name: "The North Face", color: "from-slate-800 to-slate-900", category: "Outdoor Gear" },
    { url: "https://cdn.worldvectorlogo.com/logos/patagonia.svg", name: "Patagonia", color: "from-blue-600 to-emerald-600", category: "Sustainable Gear" },
    { url: "https://cdn.worldvectorlogo.com/logos/columbia-4.svg", name: "Columbia", color: "from-blue-700 to-red-600", category: "Adventure Wear" },
    { url: "https://cdn.worldvectorlogo.com/logos/merrell-1.svg", name: "Merrell", color: "from-orange-500 to-amber-400", category: "Footwear" },
    { url: "https://cdn.worldvectorlogo.com/logos/arcteryx.svg", name: "Arc'teryx", color: "from-slate-600 to-slate-800", category: "Technical Gear" },
    { url: "https://cdn.worldvectorlogo.com/logos/black-diamond-equipment.svg", name: "Black Diamond", color: "from-gray-900 to-slate-800", category: "Climbing Gear" },
    { url: "https://cdn.worldvectorlogo.com/logos/osprey-1.svg", name: "Osprey", color: "from-emerald-600 to-blue-700", category: "Backpacks" },
    { url: "https://cdn.worldvectorlogo.com/logos/salomon-group.svg", name: "Salomon", color: "from-red-600 to-blue-600", category: "Trail Running" },
    { url: "https://cdn.worldvectorlogo.com/logos/kelty-1.svg", name: "Kelty", color: "from-emerald-600 to-emerald-800", category: "Camping Gear" },
    { url: "https://cdn.worldvectorlogo.com/logos/recreational-equipment-inc.svg", name: "REI", color: "from-emerald-700 to-blue-900", category: "Outdoor Retail" },
    { url: "https://cdn.worldvectorlogo.com/logos/marmot-1.svg", name: "Marmot", color: "from-amber-500 to-emerald-600", category: "Mountain Gear" },
    { url: "https://cdn.worldvectorlogo.com/logos/msr-1.svg", name: "MSR", color: "from-red-700 to-orange-600", category: "Expedition Gear" }
  ];

  // Duplicate list for seamless loop
  const marqueeItems = [...partnerLogos, ...partnerLogos];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white via-slate-50 to-white">
      {/* Handshake Modal (kept) */}
      <AnimatePresence>
        {showHandshake && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-lg"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 16, stiffness: 140 }}
              className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-lg mx-4 border border-slate-100"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Handshake className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Partnership Initiated!</h2>
              <p className="text-slate-600 mb-8">Welcome to our adventure partner network</p>
              <div className="w-14 h-14 mx-auto border-4 border-t-transparent border-emerald-500 rounded-full animate-spin" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center px-5 py-2.5 bg-white rounded-full border border-slate-200 shadow-sm mb-6">
            <Star className="w-4 h-4 text-amber-500 mr-2" />
            <span className="text-slate-700 font-medium">Trusted by Industry Leaders</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Our Adventure <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">Partners</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mt-4">
            We collaborate with the world’s most trusted outdoor brands to deliver
            <span className="text-emerald-600 font-semibold"> exceptional experiences</span> and
            <span className="text-blue-600 font-semibold"> premium gear solutions</span>.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 max-w-4xl mx-auto">
            {[
              { icon: Globe, number: '50+', label: 'Global Partners' },
              { icon: Award, number: '15+', label: 'Years Experience' },
              { icon: Zap, number: '1M+', label: 'Adventures Powered' },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition">
                <div className="w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center mb-3">
                  <s.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-slate-900">{s.number}</div>
                <div className="text-slate-600">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* LOGO MARQUEE — zero-jank */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/90 shadow-md">
          {/* Soft edge fades to hide entering/exiting items */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

          {/* Marquee row */}
          <div className="group relative">
            <div
              className="flex items-center gap-10 md:gap-14 lg:gap-16 whitespace-nowrap px-10 py-8 md:py-10
                          animate-[marquee_28s_linear_infinite]"
            >
              {marqueeItems.map((logo, idx) => (
                <div
                  key={idx}
                  className="inline-flex flex-col items-center justify-center shrink-0
                             bg-white border border-slate-200 rounded-2xl px-6 py-5 shadow-sm hover:shadow-md transition"
                  style={{
                    width: 240,   // fixed box to prevent CLS
                    height: 150,  // fixed box to prevent CLS
                  }}
                >
                  <div className="relative flex items-center justify-center w-full h-full">
                    {/* faint brand color wash */}
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${logo.color} opacity-5`} />
                    <img
                      src={logo.url}
                      alt={logo.name}
                      // width/height attributes help browsers reserve space
                      width="160"
                      height="80"
                      className="relative z-10 object-contain max-w-[160px] max-h-[80px]"
                      loading="lazy"
                    />
                  </div>

                  {/* Caption (shown on hover only for focus) */}
                  <div className="mt-3 text-center">
                    <div className="text-sm font-semibold text-slate-800">{logo.name}</div>
                    <div className="text-xs text-slate-500">{logo.category}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pause on hover (no JS) */}
            <style>{`
              @keyframes marquee {
                0%   { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              /* freeze animation on hover */
              .group:hover .animate-[marquee_28s_linear_infinite] {
                animation-play-state: paused;
              }
              /* reduce motion preference */
              @media (prefers-reduced-motion: reduce) {
                .animate-[marquee_28s_linear_infinite] { animation: none !important; }
              }
            `}</style>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-3xl border border-slate-200 p-10 md:p-14 shadow-md max-w-4xl mx-auto">
            <div className="w-20 h-20 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Handshake className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900">
              Ready to join our{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                adventure partner network?
              </span>
            </h3>
            <p className="text-lg text-slate-600 mt-4 max-w-2xl mx-auto">
              Partner with us to reach millions of adventure enthusiasts and grow your brand.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleClick}
                className="group px-8 py-4 bg-slate-900 text-white font-semibold rounded-2xl shadow hover:shadow-lg transition flex items-center space-x-2"
              >
                <span>Become an Adventure Partner</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white text-slate-700 font-semibold rounded-2xl shadow border border-slate-200 hover:shadow-md transition">
                Learn More
              </button>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6 mt-10 pt-6 border-t border-slate-200">
              {["Trusted by 50+ brands", "15+ years experience", "Global reach"].map((t, i) => (
                <div key={i} className="flex items-center text-slate-600">
                  <span className={`w-2 h-2 rounded-full mr-2 ${i===0?'bg-emerald-500':i===1?'bg-blue-500':'bg-amber-500'}`} />
                  <span className="text-sm font-medium">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Partner;

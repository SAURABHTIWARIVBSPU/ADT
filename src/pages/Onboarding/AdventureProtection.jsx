// AdventureProtection.jsx
import React from 'react';

export default function AdventureProtection() {
  return (
    <section className="relative font-['Outfit'] rounded-2xl">
      {/* Animated deep-emerald gradient backdrop */}
      <div className="ap-bg absolute inset-0 -z-10 opacity-95 rounded-2xl" />
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute -top-28 -left-20 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl ap-float" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-teal-300/20 blur-3xl ap-float ap-delay" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-20">
        {/* Header card with conic halo */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          {/* Conic halo ring */}
          <div className="pointer-events-none absolute -inset-[1px] rounded-[inherit] ap-ring" />

          <div className="relative grid gap-8 lg:grid-cols-[1.05fr_.95fr] p-6 sm:p-10">
            {/* Left: Titles */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5">
                <span className="h-2 w-2 rounded-full bg-lime-400 animate-pulse" />
                <span className="text-[11px] tracking-wide font-semibold text-white/80">
                  TRIANGLECOVER
                </span>
              </div>

              <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-white">
                <span className="ap-gradient-text">triangle</span>
                <span className="text-white/90">cover</span>
                <br />
                <span className="text-white/90">for Adventurers</span>
              </h2>

              <h3 className="mt-4 text-xl sm:text-2xl md:text-3xl font-bold text-white">
                However you explore, you’re protected
              </h3>

              <p className="mt-3 text-white/70 max-w-xl">
                Top-to-bottom protection, included every time you join an adventure on Adventure Triangle.
              </p>
            </div>

            {/* Right: Animated shield */}
            <div className="relative flex items-center justify-center">
              <div className="relative">
                {/* outer orbit */}
                <div className="absolute inset-[-18px] rounded-full border border-white/10" />
                <div className="absolute inset-[-18px] rounded-full ap-orbit" />

                {/* shield core */}
                <div className="ap-shield glass-card">
                  <svg viewBox="0 0 24 24" className="h-14 w-14 text-emerald-300 drop-shadow">
                    <path
                      fill="currentColor"
                      d="M12 2l7 3v6c0 5.25-3.5 9.75-7 11-3.5-1.25-7-5.75-7-11V5l7-3z"
                    />
                  </svg>
                  <span className="mt-2 text-white/90 font-semibold">Active Coverage</span>
                  <span className="text-xs text-white/60">Real-time protection status</span>
                </div>

                {/* floating badges */}
                <div className="ap-badge ap-badge--1">3m USD</div>
                <div className="ap-badge ap-badge--2">24×7</div>
                <div className="ap-badge ap-badge--3">Liability</div>
              </div>
            </div>
          </div>

          {/* Benefits list */}
          <div className="border-t border-white/10 px-6 sm:px-10 py-8">
            <ul className="grid sm:grid-cols-2 gap-4 text-white/90">
              <li className="ap-item">
                <span className="ap-dot" />
                <span className="flex-1">Up to $3m USD accident protection</span>
                <span className="ap-tick">✓</span>
              </li>
              <li className="ap-item">
                <span className="ap-dot" />
                <span className="flex-1">Up to $1m USD liability insurance</span>
                <span className="ap-tick">✓</span>
              </li>
              <li className="ap-item sm:col-span-2">
                <span className="ap-dot" />
                <span className="flex-1">24-hour emergency support line</span>
                <span className="ap-tick">✓</span>
              </li>
            </ul>

            {/* CTA */}
            <div className="mt-8 flex flex-col items-center">
              <button
                className="relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500
                           text-white px-6 py-3 md:px-8 md:py-3.5 font-semibold
                           transition-transform duration-300 ap-btn-shine hover:scale-[1.02]"
              >
                Learn about TriangleCover
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* disclaimer */}
              <p className="mt-6 text-[11px] leading-relaxed text-white/60 max-w-2xl text-center">
                Accident Protection reimburses for certain mishaps during adventures on Adventure Triangle. It’s not insurance
                and may apply only if participants don’t pay. Liability insurance is provided by 3rd parties.
                <a href="#" className="underline underline-offset-2 decoration-white hover:text-white ml-1">
                  Check details and exclusions.
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scoped animations + utilities */}
      <style jsx>{`
        /* Motion safety */
        @media (prefers-reduced-motion: reduce) {
          .ap-bg, .ap-float, .ap-ring, .ap-orbit, .ap-shield, .ap-badge, .ap-btn-shine::after {
            animation: none !important;
            transition: none !important;
          }
        }

        /* Background gradient */
        @keyframes apGradient {
          0%,100% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
        }
        .ap-bg {
          background-image: linear-gradient(135deg, #071a14, #0b2a24, #081f17);
          background-size: 200% 200%;
          animation: apGradient 20s ease-in-out infinite;
        }

        /* Floating blobs */
        @keyframes apFloat {
          0%,100% { transform: translate3d(0,0,0); }
          50% { transform: translate3d(0,-10px,0); }
        }
        .ap-float { animation: apFloat 10s ease-in-out infinite; }
        .ap-delay { animation-delay: 1.2s; }

        /* Conic halo ring */
        :root { --angle: 0deg; }
        @property --angle {
          syntax: '<angle>';
          inherits: false;
          initial-value: 0deg;
        }
        @keyframes spin {
          to { --angle: 360deg; }
        }
        .ap-ring {
          background: conic-gradient(from var(--angle), rgba(16,185,129,.35), rgba(45,212,191,.35), rgba(6,182,212,.35), rgba(16,185,129,.35));
          animation: spin 10s linear infinite;
          filter: blur(6px);
        }

        /* Orbit line */
        @keyframes orbit {
          0% { transform: rotate(0deg); opacity: .7; }
          50% { opacity: 1; }
          100% { transform: rotate(360deg); opacity: .7; }
        }
        .ap-orbit {
          border: 1px dashed rgba(255,255,255,.15);
          animation: orbit 14s linear infinite;
        }

        /* Shield glass card */
        @keyframes pop {
          0% { transform: scale(1); }
          50% { transform: scale(1.03); }
          100% { transform: scale(1); }
        }
        .glass-card {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          width: 220px; height: 180px;
          background: linear-gradient(180deg, rgba(255,255,255,.09), rgba(255,255,255,.04));
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 22px;
          box-shadow: 0 20px 50px rgba(0,0,0,.35);
          animation: pop 6s ease-in-out infinite;
        }
        .ap-shield { }

        /* Badges */
        @keyframes floatBadge {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .ap-badge {
          position: absolute;
          padding: 6px 10px;
          font-size: 12px;
          border-radius: 999px;
          color: #06130f;
          background: linear-gradient(90deg, #a7f3d0, #99f6e4);
          border: 1px solid rgba(255,255,255,.35);
          box-shadow: 0 10px 24px rgba(0,0,0,.25);
          animation: floatBadge 5.5s ease-in-out infinite;
        }
        .ap-badge--1 { top: -6px; right: -8px; }
        .ap-badge--2 { bottom: 6px; left: -18px; animation-delay: .8s; }
        .ap-badge--3 { top: 20px; left: -28px; animation-delay: .3s; }

        /* Gradient text */
        @keyframes gradText {
          0%,100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .ap-gradient-text {
          background-image: linear-gradient(90deg, #84cc16, #10b981, #06b6d4, #84cc16);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradText 7s ease-in-out infinite;
          margin-right: 4px;
        }

        /* Benefit items */
        .ap-item {
          display: flex; align-items: center; gap: 10px;
          padding: 14px 16px;
          border-radius: 14px;
          background: linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.03));
          border: 1px solid rgba(255,255,255,.08);
          transition: transform .25s ease, background .25s ease, border-color .25s ease;
        }
        .ap-item:hover { transform: translateY(-2px); border-color: rgba(255,255,255,.15); }
        .ap-dot {
          height: 10px; width: 10px; border-radius: 999px;
          background: radial-gradient(circle at 30% 30%, #facc15, #f59e0b 70%);
          box-shadow: 0 0 0 3px rgba(251,191,36,.15);
        }
        .ap-tick {
          color: #bbf7d0;
          font-weight: 800;
          padding-left: 6px;
        }

        /* Button shine */
        .ap-btn-shine { position: relative; overflow: hidden; }
        .ap-btn-shine::after {
          content: "";
          position: absolute; inset: 0;
          background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,.45) 20%, transparent 45%);
          transform: translateX(-120%);
          transition: transform .9s ease;
          pointer-events: none;
        }
        .ap-btn-shine:hover::after { transform: translateX(120%); }
      `}</style>
    </section>
  );
}

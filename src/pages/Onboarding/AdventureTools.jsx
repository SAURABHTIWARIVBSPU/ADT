// AdventureTools.jsx
import React from 'react';
const tools = [
  {
    title: 'Activity Editor',
    subtitle: 'Showcase every zone of your adventure',
    image: '/images/m1.webp',
  },
  {
    title: 'Schedule & Bookings',
    subtitle: 'Manage availability, dates, and pricing',
    image: '/images/m2.webp',
  },
  {
    title: 'Messages',
    subtitle: 'Chat with guests and adventure guides',
    image: '/images/l1.webp',
  },
];


export default function AdventureTools() {
  return (
    <section className="relative font-['Outfit'] py-20 px-6 overflow-hidden">
      {/* Animated dark-glass gradient */}
      <div className="atools-bg absolute inset-0 -z-10" />
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl atools-float" />
      <div className="pointer-events-none absolute -bottom-28 -right-24 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl atools-float atools-delay" />
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-red-400/15 blur-3xl atools-float atools-delay2" />

      <div className="max-w-7xl mx-auto">
        {/* Header Card */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          {/* Conic halo ring */}
          <div className="pointer-events-none absolute -inset-[1px] rounded-[inherit] atools-ring" />

          <div className="relative px-6 md:px-10 pt-10 pb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] tracking-wide font-semibold text-white/80">
                HOST TOOLKIT
              </span>
            </div>

            <h2 className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight tracking-tight text-white">
              All the tools you need,
              <br className="hidden md:block" />
              <span className="relative inline-block">
                <span className="atools-gradient-text">in one place</span>
                <span className="absolute -bottom-1 left-0 right-0 h-[3px] atools-underline" />
              </span>
            </h2>

            <p className="mt-3 text-white/70 max-w-2xl">
              Manage listings, availability, messaging, and more—built for seamless, high-quality adventure hosting.
            </p>
          </div>

          {/* Tools Grid */}
          <div className="px-6 md:px-10 pb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-10">
              {tools.map((tool, i) => (
                <div
                  key={tool.title}
                  className="group relative overflow-hidden rounded-2xl border border-white/12 bg-white/[0.07] backdrop-blur-lg shadow-[0_10px_30px_rgba(0,0,0,0.35)] atools-tilt"
                  style={{ animationDelay: `${i * 90}ms` }}
                >
                  {/* Accent ring */}
                  <div className="pointer-events-none absolute -inset-[1px] rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500 atools-card-ring" />

                  {/* Image */}
                  <div className="relative aspect-[9/16] overflow-hidden">
                    <img
                      src={tool.image}
                      alt={tool.title}
                      className="h-full w-full object-cover transform transition-transform duration-[1100ms] group-hover:scale-[1.08]"
                      loading="lazy"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                    {/* Float badge */}
                    <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-slate-900 shadow-lg">
                      <span className={`h-2 w-2 rounded-full ${
                        i === 0 ? 'bg-sky-500' : i === 1 ? 'bg-red-500' : 'bg-emerald-500'
                      }`} />
                      {i === 0 ? 'Create' : i === 1 ? 'Schedule' : 'Connect'}
                    </div>
                  </div>

                  {/* Text */}
                  <div className="relative p-5">
                    <h3 className="text-lg font-bold text-white">{tool.title}</h3>
                    <p className="mt-1 text-sm text-white/70">{tool.subtitle}</p>

                    {/* CTA row */}
                    <div className="mt-4 flex items-center gap-3">
                      <button
                        className="relative inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold text-white
                                   atools-chip"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                        Blue Sky
                      </button>
                      <button
                        className="relative inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold text-white
                                   atools-chip atools-chip--red"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                        Red
                      </button>
                      <button
                        className="relative inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold text-white
                                   atools-chip atools-chip--emerald"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Emerald
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-12 text-center">
              <a
                href="/partner/dashboard"
                className="relative inline-flex items-center justify-center rounded-full 
                           bg-gradient-to-r from-sky-500 via-red-500 to-emerald-500
                           text-white font-semibold px-6 md:px-8 py-3 md:py-3.5 shadow-xl hover:shadow-2xl
                           hover:scale-[1.02] transition-transform duration-300 atools-btn-shine"
              >
                Explore Host Dashboard
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scoped animations */}
      <style jsx>{`
        /* Motion safety */
        @media (prefers-reduced-motion: reduce) {
          .atools-bg, .atools-float, .atools-ring, .atools-underline, .atools-gradient-text, .atools-card-ring, .atools-tilt, .atools-btn-shine::after {
            animation: none !important;
            transition: none !important;
          }
        }

        /* Background gradient (deep night with blue/red/emerald sweep) */
        @keyframes atoolsGradient {
          0%,100% { background-position: 0% 0%; }
          50%     { background-position: 100% 100%; }
        }
        .atools-bg {
          background-image: linear-gradient(135deg, #0b1220, #0f172a, #091a1a, #1a0c0c, #0b1220);
          background-size: 220% 220%;
          animation: atoolsGradient 22s ease-in-out infinite;
          opacity: 0.95;
        }

        /* Floating blobs */
        @keyframes atoolsFloat {
          0%,100% { transform: translate3d(0,0,0); }
          50%     { transform: translate3d(0,-10px,0); }
        }
        .atools-float { animation: atoolsFloat 9s ease-in-out infinite; }
        .atools-delay { animation-delay: 1.2s; }
        .atools-delay2 { animation-delay: .5s; }

        /* Conic halo ring */
        :root { --angle: 0deg; }
        @property --angle { syntax: '<angle>'; inherits: false; initial-value: 0deg; }
        @keyframes atoolsSpin { to { --angle: 360deg; } }
        .atools-ring {
          background: conic-gradient(from var(--angle),
            rgba(56,189,248,.30),  /* sky */
            rgba(248,113,113,.30), /* red */
            rgba(52,211,153,.30),  /* emerald */
            rgba(56,189,248,.30));
          animation: atoolsSpin 12s linear infinite;
          filter: blur(6px);
        }

        /* Animated gradient headline underline */
        @keyframes atoolsUnderlineKF {
          0%   { transform: scaleX(0); opacity: .7; }
          60%  { transform: scaleX(1); opacity: 1; }
          100% { transform: scaleX(1); opacity: .9; }
        }
        .atools-underline {
          background: linear-gradient(90deg,#38bdf8,#ef4444,#34d399);
          transform-origin: left;
          animation: atoolsUnderlineKF 1.2s ease .3s both;
          border-radius: 999px;
        }

        /* Animated gradient text */
        @keyframes atoolsGradTextKF {
          0%,100% { background-position: 0% 50%; }
          50%     { background-position: 100% 50%; }
        }
        .atools-gradient-text {
          background-image: linear-gradient(90deg,#38bdf8,#ef4444,#34d399,#38bdf8);
          background-size: 220% 220%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: atoolsGradTextKF 7s ease-in-out infinite;
          padding-right: 6px;
        }

        /* Tilt on hover */
        .atools-tilt {
          transform-style: preserve-3d;
          transition: transform .5s cubic-bezier(.2,.8,.2,1), box-shadow .5s, border-color .5s;
          will-change: transform;
        }
        .atools-tilt:hover {
          transform: perspective(1100px) rotateX(1.1deg) rotateY(-1.2deg) translateY(-2px);
          border-color: rgba(255,255,255,.18);
          box-shadow: 0 18px 50px rgba(0,0,0,.35);
        }

        /* Gradient ring on card hover */
        .atools-card-ring {
          background: conic-gradient(from 180deg at 50% 50%,
            rgba(56,189,248,.35),
            rgba(248,113,113,.35),
            rgba(52,211,153,.35),
            rgba(56,189,248,.35));
          filter: blur(8px);
          transition: opacity .4s ease;
        }

        /* Color chips */
        .atools-chip {
          background: linear-gradient(180deg, rgba(56,189,248,.25), rgba(56,189,248,.15));
          border: 1px solid rgba(255,255,255,.18);
          border-radius: 999px;
          padding: 6px 10px;
        }
        .atools-chip--red {
          background: linear-gradient(180deg, rgba(248,113,113,.25), rgba(248,113,113,.15));
        }
        .atools-chip--emerald {
          background: linear-gradient(180deg, rgba(52,211,153,.25), rgba(52,211,153,.15));
        }

        /* Button shine */
        .atools-btn-shine { position: relative; overflow: hidden; }
        .atools-btn-shine::after {
          content: "";
          position: absolute; inset: 0;
          background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,.45) 20%, transparent 45%);
          transform: translateX(-120%);
          transition: transform .9s ease;
          pointer-events: none;
        }
        .atools-btn-shine:hover::after { transform: translateX(120%); }
      `}</style>
    </section>
  );
}

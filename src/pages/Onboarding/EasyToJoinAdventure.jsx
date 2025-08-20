export default function EasyToJoinAdventure() {
  return (
    <section className="relative py-20 px-8 text-center overflow-hidden font-outfit rounded-2xl">
      {/* Animated sunset gradient background */}
      <div className="ej-bg absolute inset-0 -z-10 opacity-95" />
      {/* Warm ambient blobs */}
      <div className="pointer-events-none absolute -top-16 -left-16 h-64 w-64 rounded-full bg-rose-400/25 blur-3xl ej-float" />
      <div className="pointer-events-none absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-amber-300/25 blur-3xl ej-float ej-delay" />

      {/* Heading */}
      <h2 className="relative text-4xl md:text-5xl font-extrabold mb-16 tracking-wide max-w-4xl mx-auto text-white drop-shadow-md">
        Join a{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-amber-300 to-fuchsia-400">
          Global Network
        </span>{" "}
        of Adventurers on{" "}
        <span className="font-patrick text-5xl text-white/90 whitespace-nowrap">
          Adventure Triangle
        </span>
        {/* underline sweep */}
        <span className="block mx-auto mt-4 h-[3px] w-40 ej-underline" />
      </h2>

      {/* Mobile UI Showcase */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-16 mb-20 px-4">
        <div className="w-80 bg-white/90 rounded-xl shadow-xl hover:shadow-2xl transition-transform duration-300 p-4 ej-card">
          <img
            src="/t1.webp"
            alt="Explore Adventures"
            className="w-full rounded-lg"
          />
        </div>
        <div className="w-80 bg-white/90 rounded-xl shadow-xl hover:shadow-2xl transition-transform duration-300 p-4 ej-card">
          <img
            src="/r22.webp"
            alt="Connect & Join"
            className="w-full rounded-lg"
          />
        </div>
      </div>

      {/* Features / Benefits */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
        {/* Feature 1 */}
        <div className="bg-white/95 rounded-xl shadow-lg p-8 border border-white/60 ej-feature">
          <div className="flex justify-center mb-4">
            <div className="bg-rose-50 p-4 rounded-full shadow-lg border border-rose-100">
              <svg
                className="w-8 h-8 text-rose-600"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx={12} cy={12} r={10} />
                <line x1={2} y1={12} x2={22} y2={12} />
                <line x1={12} y1={2} x2={12} y2={22} />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-3 text-slate-800">Seamless Global Connections</h3>
          <p className="text-slate-600 text-sm">
            Connect with adventurers worldwide and plan your next journey effortlessly.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-white/95 rounded-xl shadow-lg p-8 border border-white/60 ej-feature ej-feature--amber">
          <div className="flex justify-center mb-4">
            <div className="bg-amber-50 p-4 rounded-full shadow-lg border border-amber-100">
              <svg
                className="w-8 h-8 text-amber-600"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x={3} y={4} width={18} height={18} rx={2} />
                <line x1={16} y1={2} x2={16} y2={6} />
                <line x1={8} y1={2} x2={8} y2={6} />
                <line x1={3} y1={10} x2={21} y2={10} />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-3 text-slate-800">Global Event & Meetup Planning</h3>
          <p className="text-slate-600 text-sm">
            Organize and discover events with a community that spans the globe.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-white/95 rounded-xl shadow-lg p-8 border border-white/60 ej-feature ej-feature--violet">
          <div className="flex justify-center mb-4">
            <div className="bg-fuchsia-50 p-4 rounded-full shadow-lg border border-fuchsia-100">
              <svg
                className="w-8 h-8 text-fuchsia-600"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx={12} cy={8} r={4} />
                <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-3 text-slate-800">Trusted by Adventurers Worldwide</h3>
          <p className="text-slate-600 text-sm">
            Join a vibrant community that spans borders and cultures, sharing unforgettable experiences.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-12">
        <a
          href="/Partner-signup"
          className="relative inline-flex items-center justify-center rounded-full 
                     bg-gradient-to-r from-rose-600 via-amber-500 to-fuchsia-600 
                     text-white font-semibold px-8 py-4 shadow-lg hover:shadow-2xl
                     hover:scale-[1.03] transition-transform duration-300 ej-btn-shine"
        >
          Get Started Now
        </a>
      </div>

      {/* Scoped styles for animation + accents */}
      <style jsx>{`
        /* Motion safety */
        @media (prefers-reduced-motion: reduce) {
          .ej-bg, .ej-float, .ej-underline, .ej-card, .ej-btn-shine::after { 
            animation: none !important; 
            transition: none !important; 
          }
        }

        /* Animated background (sunset sweep) */
        @keyframes ejGradient {
          0%,100% { background-position: 0% 50%; }
          50%     { background-position: 100% 50%; }
        }
        .ej-bg {
          background-image: linear-gradient(120deg, #2a0f1f, #3a1b0a, #2a1840, #2a0f1f);
          background-size: 220% 220%;
          animation: ejGradient 20s ease-in-out infinite;
        }

        /* Floating ambient blobs */
        @keyframes ejFloat {
          0%,100% { transform: translate3d(0,0,0); }
          50%     { transform: translate3d(0,-10px,0); }
        }
        .ej-float { animation: ejFloat 9s ease-in-out infinite; }
        .ej-delay { animation-delay: 1.2s; }

        /* Underline sweep */
        @keyframes ejUnderline {
          0%   { transform: scaleX(0); opacity: .7; }
          60%  { transform: scaleX(1); opacity: 1; }
          100% { transform: scaleX(1); opacity: .9; }
        }
        .ej-underline {
          background: linear-gradient(90deg, #fb7185, #f59e0b, #a78bfa);
          transform-origin: left;
          animation: ejUnderline 1.2s ease .3s both;
          border-radius: 999px;
        }

        /* Cards: subtle lift + gradient ring on hover */
        .ej-card {
          transition: transform .3s ease, box-shadow .3s ease;
          position: relative;
          border: 1px solid rgba(255,255,255,.6);
        }
        .ej-card::before {
          content: "";
          position: absolute; inset: -2px; border-radius: 0.75rem;
          background: conic-gradient(from 180deg at 50% 50%, rgba(251,113,133,.35), rgba(245,158,11,.35), rgba(168,85,247,.35), rgba(251,113,133,.35));
          filter: blur(8px); opacity: 0; transition: opacity .35s ease;
          z-index: -1;
        }
        .ej-card:hover::before { opacity: .9; }

        /* Feature accent borders */
        .ej-feature {
          border-top: 4px solid rgba(251, 113, 133, .9); /* rose */
          transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
        }
        .ej-feature:hover { transform: translateY(-3px); box-shadow: 0 20px 40px rgba(0,0,0,.15); }
        .ej-feature--amber { border-top-color: rgba(245, 158, 11, .95); }
        .ej-feature--violet { border-top-color: rgba(168, 85, 247, .95); }

        /* Button shine */
        .ej-btn-shine { overflow: hidden; }
        .ej-btn-shine::after {
          content: "";
          position: absolute; inset: 0;
          background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,.45) 20%, transparent 45%);
          transform: translateX(-120%);
          transition: transform .9s ease;
          pointer-events: none;
        }
        .ej-btn-shine:hover::after { transform: translateX(120%); }
      `}</style>
    </section>
  );
}

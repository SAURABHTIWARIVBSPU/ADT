import { useState, useId } from "react";

/* Top-class Accordion Row */
const FAQSection = ({ title, questions, idBase }) => {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = `${idBase}-panel`;
  const buttonId = `${idBase}-button`;

  return (
    <div className="relative group/row border-b border-white/10">
      {/* subtle conic glow on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover/row:opacity-100 transition-opacity duration-500">
        <div className="absolute -inset-px rounded-2xl [mask:linear-gradient(#000,transparent_65%)] 
                        bg-[conic-gradient(from_180deg_at_50%_120%,#22d3ee_0deg,#a78bfa_90deg,#fb7185_180deg,#22d3ee_360deg)] 
                        blur-xl" />
      </div>

      <button
        id={buttonId}
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full flex items-center justify-between gap-4 py-6 px-5 md:px-6 text-left
                   rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400
                   transition-colors duration-300"
      >
        <span className="text-base md:text-lg font-semibold text-white/90 group-hover/row:text-white transition-colors">
          {title}
        </span>

        {/* Icon: chevron with progress ring */}
        <span className="relative inline-flex items-center justify-center">
          <svg
            className={`h-5 w-5 md:h-6 md:w-6 transition-transform duration-300 ${
              isOpen ? "rotate-180 text-sky-300" : "rotate-0 text-white/60 group-hover/row:text-white"}
            `}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>

          {/* progress ring anim when open */}
          <span
            className={`absolute inset-[-8px] rounded-full border 
                        ${isOpen ? "border-white/30" : "border-transparent"}`}
          />
        </span>
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid transition-[grid-template-rows] duration-500 ease-out
                    ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <ul className="px-6 pb-6 md:px-8 space-y-2.5">
            {questions.map((q, i) => (
              <li
                key={i}
                className={`relative pl-6 text-sm md:text-base text-white/80 
                            transition-all duration-300
                            ${isOpen ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"}`}
                style={{ transitionDelay: isOpen ? `${i * 70}ms` : "0ms" }}
              >
                {/* bullet */}
                <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-gradient-to-r from-sky-400 to-fuchsia-500 shadow-[0_0_0_2px_rgba(255,255,255,0.09)]" />
                <span className="hover:text-white">{q}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default function AdventureFAQ() {
  const uid = useId();

  return (
    <section className="relative max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-16">
      {/* Animated dark gradient frame */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
        {/* moving gradient */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_20%_0%,#0ea5e9_0%,transparent_60%),radial-gradient(60%_60%_at_100%_0%,#a78bfa_0%,transparent_55%),radial-gradient(70%_60%_at_50%_100%,#fb7185_0%,transparent_60%)] opacity-[0.18]" />
        <div className="absolute inset-0 -z-10 ag-bg pointer-events-none" />

        {/* floating blobs */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl ag-blob" />
        <div className="pointer-events-none absolute -bottom-28 -right-20 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl ag-blob ag-blob-delay" />

        {/* header */}
        <div className="px-6 md:px-10 pt-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-wide text-white/80">HELP CENTER</span>
          </div>

          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold leading-tight tracking-tight text-white">
            Your Adventure Questions,
            <br className="hidden md:block" />
            <span className="relative inline-block">
              <span className="at-gradient-text">Answered</span>
              <span className="absolute -bottom-1 left-0 right-0 h-[3px] ag-underline" />
            </span>
          </h2>

          <p className="mt-3 text-white/70 max-w-2xl">
            Get answers to the most common questions about planning and hosting unforgettable adventures.
          </p>
        </div>

        {/* content card */}
        <div className="mt-8 bg-white/[0.06] backdrop-blur-xl border-t border-white/10">
          <div className="divide-y divide-white/10">
            <FAQSection
              idBase={`${uid}-top`}
              title="Top questions"
              questions={[
                "What is the Adventure Triangle Park?",
                "Do I need to book activities in advance?",
                "Is the park suitable for all ages?",
              ]}
            />
            <FAQSection
              idBase={`${uid}-zones`}
              title="Adventure Zones"
              questions={[
                "What activities are available in the Air Zone?",
                "What can I do in the Water Zone?",
                "Are there hiking trails in the Land Zone?",
              ]}
            />
            <FAQSection
              idBase={`${uid}-safety`}
              title="Safety & Guidelines"
              questions={[
                "Are helmets and safety gear provided?",
                "What's the park's cancellation policy?",
                "Are pets allowed in the park?",
              ]}
            />
          </div>
        </div>

        {/* bottom cta */}
        <div className="px-6 md:px-10 py-10 flex flex-col items-center text-center">
          <h3 className="text-lg md:text-xl font-semibold text-white">Still have questions?</h3>
          <p className="mt-1 text-sky-300">Get answers from a park guide or adventure expert.</p>
          <button
            className="relative mt-5 inline-flex items-center gap-2 rounded-full bg-white text-slate-900 px-6 py-3 md:px-8 md:py-3.5 font-semibold
                       transition-transform duration-300 at-button-shine hover:scale-[1.02]"
          >
            Ask a guide
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* animations */}
      <style jsx>{`
        /* Motion safety */
        @media (prefers-reduced-motion: reduce) {
          .ag-bg, .ag-blob, .ag-underline, .at-gradient-text { animation: none !important; }
        }

        /* animated diagonal dark gradient */
        @keyframes agGradient {
          0%,100% { background-position: 0% 0%; }
          50%     { background-position: 100% 100%; }
        }
        .ag-bg {
          background-image: linear-gradient(135deg, #0b1220, #0f172a, #0b1220);
          background-size: 200% 200%;
          animation: agGradient 18s ease infinite;
          opacity: 0.95;
        }

        /* floating blobs */
        @keyframes agFloat {
          0%,100% { transform: translate3d(0,0,0); }
          50%     { transform: translate3d(0,-10px,0); }
        }
        .ag-blob { animation: agFloat 9s ease-in-out infinite; }
        .ag-blob-delay { animation-delay: 1.2s; }

        /* underline sweep */
        @keyframes underline {
          0%   { transform: scaleX(0); opacity: .6; }
          60%  { transform: scaleX(1); opacity: 1; }
          100% { transform: scaleX(1); opacity: .9; }
        }
        .ag-underline {
          background: linear-gradient(90deg,#22d3ee,#a78bfa,#fb7185);
          transform-origin: left;
          animation: underline 1.2s ease .25s both;
          border-radius: 999px;
        }

        /* animated gradient text */
        @keyframes gradText {
          0%,100% { background-position: 0% 50%; }
          50%     { background-position: 100% 50%; }
        }
        .at-gradient-text {
          background-image: linear-gradient(90deg,#22d3ee,#a78bfa,#fb7185,#22d3ee);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradText 6s ease-in-out infinite;
        }

        /* button shine */
        .at-button-shine { position: relative; overflow: hidden; }
        .at-button-shine::after {
          content: "";
          position: absolute; inset: 0;
          background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,.45) 20%, transparent 45%);
          transform: translateX(-120%);
          transition: transform .9s ease;
          pointer-events: none;
        }
        .at-button-shine:hover::after { transform: translateX(120%); }
      `}</style>
    </section>
  );
}

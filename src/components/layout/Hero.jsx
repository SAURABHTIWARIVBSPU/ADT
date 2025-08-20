import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const landImages = ["/images/L1.jpg", "/images/L2.jpeg"];
  const waterImages = ["/images/W1.jpg", "/images/W2.jpg"];
  const airImages = ["/images/S1.jpeg", "/images/S2.jpg", "/images/S3.jpeg"];

  const [landIndex, setLandIndex] = useState(0);
  const [waterIndex, setWaterIndex] = useState(0);
  const [airIndex, setAirIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [hovered, setHovered] = useState(null);
  const [loaded, setLoaded] = useState({ land: false, air: false, water: false });
  const navigate = useNavigate();

  const adventureDescriptions = {
    land: { type: "Land Adventure", thing: "Trekking, Hiking, Safari, Biking" },
    air: { type: "Air Adventure", thing: "Paragliding, Skydiving, Hot Air Balloon" },
    water: { type: "Water Adventure", thing: "Rafting, Scuba Diving, Surfing" }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLandIndex((p) => (p + 1) % landImages.length);
      setWaterIndex((p) => (p + 1) % waterImages.length);
      setAirIndex((p) => (p + 1) % airImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const onImgLoad = (key) => setLoaded((s) => ({ ...s, [key]: true }));

  return (
    <section
      className="
        relative overflow-hidden
        flex flex-col lg:flex-row items-center justify-center min-h-screen
        px-4 py-12 md:py-0
        text-fuchsia-50
      "
      aria-label="Adventure Triangle hero section"
    >
      {/* === Aurora Sunset Background (no images) === */}
      <div className="absolute inset-0 -z-20">
        {/* Aurora sheets */}
        <div
          className="
            absolute inset-0
            bg-[radial-gradient(1200px_600px_at_50%_10%,rgba(244,114,182,0.22),transparent_60%),conic-gradient(from_210deg_at_50%_40%,#0a0612_0%,#120a1e_35%,#1a0f2a_60%,#0e0a14_100%)]
          "
        />
        {/* Soft aurora ribbons */}
        <div className="absolute -inset-x-10 -top-32 h-[60vh] opacity-60 blur-3xl">
          <div className="w-full h-full bg-[conic-gradient(from_90deg,#ff80b5_0%,#ff6ad5_15%,#a78bfa_40%,#60a5fa_65%,#ff80b5_100%)] animate-aurora" />
        </div>
        {/* Grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.07] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(#ffffff 1px, transparent 1px), radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "22px 22px, 22px 22px",
            backgroundPosition: "0 0, 11px 11px"
          }}
        />
      </div>

      {/* Local animations (keeps imports unchanged) */}
      <style>{`
        @keyframes floatUpDown { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes slowRotate { 0%{transform:rotate(0)} 100%{transform:rotate(360deg)} }
        @keyframes pulseRing { 0%{transform:scale(1);opacity:.7} 70%{transform:scale(1.25);opacity:0} 100%{transform:scale(1.25);opacity:0} }
        @keyframes fadeIn { from{opacity:0; transform:translateY(10px)} to{opacity:1; transform:translateY(0)} }
        @keyframes aurora { 0%{transform:translateX(-10%) skewY(-3deg)} 50%{transform:translateX(10%) skewY(3deg)} 100%{transform:translateX(-10%) skewY(-3deg)} }
        .float-1{animation:floatUpDown 5.5s ease-in-out infinite}
        .float-2{animation:floatUpDown 6.2s ease-in-out infinite .2s}
        .float-3{animation:floatUpDown 7s ease-in-out infinite .4s}
        .spin-slow{animation:slowRotate 22s linear infinite}
        .animate-in{animation:fadeIn .55s ease-out both}
        .ring-pulse::after{content:'';position:absolute;inset:-8px;border-radius:24px;border:2px solid rgba(255,255,255,.45);animation:pulseRing 2.4s ease-out infinite}
        .img-fade{opacity:0;transition:opacity .4s ease-out}
        .img-fade.loaded{opacity:1}
        .animate-aurora{animation:aurora 16s ease-in-out infinite}
        /* Diamond frame with glow */
        .diamond {
          transform: rotate(45deg);
          border-radius: 24px;
          box-shadow:
            0 10px 30px rgba(250, 204, 255, .15),
            inset 0 0 0 1px rgba(255, 255, 255, .2);
          background: linear-gradient(145deg, rgba(255,255,255,.14), rgba(255,255,255,.03));
          overflow: hidden;
        }
        .diamond > img { transform: rotate(-45deg) scale(1.06); }
      `}</style>

      {/* === Left Section: Headline & Search === */}
      <div className="w-full lg:w-1/2 z-20 text-center lg:text-left lg:pl-16 mb-12 lg:mb-0 animate-in">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-400 to-fuchsia-500">
            Adventure
          </span>{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-fuchsia-400 to-rose-500">
            Triangle
          </span>
        </h1>

        {/* Neon underline (SVG) */}
        <div className="mt-3 h-6">
          <svg width="360" height="26" viewBox="0 0 360 26" className="mx-auto lg:mx-0">
            <defs>
              <linearGradient id="neonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fb7185" />
                <stop offset="50%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>
            </defs>
            <path
              d="M10 18 Q 130 2 240 18 T 350 18"
              fill="none"
              stroke="url(#neonGrad)"
              strokeWidth="3.5"
              style={{ filter: "drop-shadow(0 0 6px rgba(168,85,247,.45))" }}
            />
          </svg>
        </div>

        <p className="text-fuchsia-100/90 text-lg md:text-xl mt-4">
          Chase sunset lines—air, water, and land, your way.
        </p>

        {/* Search (glass + gradient button) */}
        <div className="mt-6 flex justify-center lg:justify-start">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              aria-label="Search adventures"
              placeholder="Try: Skydiving in Dubai…"
              className="
                peer pr-14 pl-4 py-3 w-full
                rounded-2xl border border-white/15
                bg-white/10 backdrop-blur-xl
                placeholder:text-fuchsia-100/60
                text-white shadow-sm
                focus:outline-none focus:ring-2 focus:ring-fuchsia-400/60 focus:border-transparent
                transition
              "
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && search.trim()) {
                  navigate(`/booking?search=${encodeURIComponent(search.trim())}`);
                }
              }}
            />
            <button
              type="button"
              aria-label="Search"
              className="
                absolute right-1.5 top-1/2 -translate-y-1/2
                px-3 py-2 rounded-xl
                bg-gradient-to-r from-rose-400 via-fuchsia-400 to-violet-400
                text-slate-900 font-semibold
                hover:opacity-95 active:scale-[0.98]
                transition
              "
              onClick={() => {
                if (search.trim()) {
                  navigate(`/booking?search=${encodeURIComponent(search.trim())}`);
                }
              }}
            >
              Go
            </button>
          </div>
        </div>
      </div>

      {/* === Right Section: Diamond Frames + Accents === */}
      <div className="w-full lg:w-1/2 flex justify-center items-center relative z-20">
        {/* Rotating halo */}
        <div className="absolute w-[360px] h-[360px] md:w-[480px] md:h-[480px] lg:w-[680px] lg:h-[680px]">
          <svg className="w-full h-full spin-slow" viewBox="0 0 600 600" aria-hidden="true">
            <defs>
              <radialGradient id="halo" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(244,114,182,0.35)" />
                <stop offset="60%" stopColor="rgba(168,85,247,0.18)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0)" />
              </radialGradient>
            </defs>
            <circle cx="300" cy="300" r="190" fill="url(#halo)" />
            <circle cx="300" cy="300" r="230" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />
          </svg>
        </div>

        <div className="relative w-[300px] h-[300px] md:w-[420px] md:h-[420px] lg:w-[600px] lg:h-[600px]">
          {/* Top Center - Land (Diamond) */}
          <div
            className="
              absolute w-40 h-40 md:w-56 md:h-56 lg:w-72 lg:h-72
              top-0 left-1/2 -translate-x-1/2 float-1
            "
            onMouseEnter={() => setHovered("land")}
            onMouseLeave={() => setHovered(null)}
            style={{ zIndex: hovered === "land" ? 30 : 20 }}
          >
            <div className="relative diamond ring-pulse">
              <img
                src={landImages[landIndex]}
                alt="Land Adventure"
                onLoad={() => onImgLoad("land")}
                className={`
                  img-fade ${loaded.land ? "loaded" : ""}
                  w-full h-full object-cover
                  transition-transform duration-300 ease-out
                  ${hovered === "land" ? "scale-[1.08]" : "hover:scale-[1.03]"}
                `}
                draggable={false}
              />
              {/* gradient rim */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl" style={{
                boxShadow: "inset 0 0 0 2px rgba(251,113,133,.5), 0 0 28px rgba(251,113,133,.25)"
              }} />
            </div>

            {hovered === "land" && (
              <div
                className="
                  absolute left-1/2 top-full mt-3 -translate-x-1/2
                  bg-white/90 text-fuchsia-900 rounded-xl shadow-lg px-4 py-2
                  text-center text-sm font-semibold whitespace-nowrap
                "
                role="tooltip"
              >
                <div>{adventureDescriptions.land.type}</div>
                <div className="text-xs font-normal text-rose-700">
                  {adventureDescriptions.land.thing}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Left - Air (Diamond) */}
          <div
            className="
              absolute w-36 h-36 md:w-52 md:h-52 lg:w-64 lg:h-64
              bottom-0 left-0 md:left-5 lg:left-0 float-2
            "
            onMouseEnter={() => setHovered("air")}
            onMouseLeave={() => setHovered(null)}
            style={{ zIndex: hovered === "air" ? 30 : 20 }}
          >
            <div className="relative diamond ring-pulse">
              <img
                src={airImages[airIndex]}
                alt="Air Adventure"
                onLoad={() => onImgLoad("air")}
                className={`
                  img-fade ${loaded.air ? "loaded" : ""}
                  w-full h-full object-cover
                  transition-transform duration-300 ease-out
                  ${hovered === "air" ? "scale-[1.08]" : "hover:scale-[1.03]"}
                `}
                draggable={false}
              />
              <div className="pointer-events-none absolute inset-0 rounded-3xl" style={{
                boxShadow: "inset 0 0 0 2px rgba(167,139,250,.55), 0 0 28px rgba(167,139,250,.28)"
              }} />
            </div>

            {hovered === "air" && (
              <div
                className="
                  absolute left-1/2 top-full mt-3 -translate-x-1/2
                  bg-white/90 text-fuchsia-900 rounded-xl shadow-lg px-4 py-2
                  text-center text-sm font-semibold whitespace-nowrap
                "
                role="tooltip"
              >
                <div>{adventureDescriptions.air.type}</div>
                <div className="text-xs font-normal text-violet-700">
                  {adventureDescriptions.air.thing}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Right - Water (Diamond) */}
          <div
            className="
              absolute w-36 h-36 md:w-52 md:h-52 lg:w-64 lg:h-64
              bottom-0 right-0 md:right-5 lg:right-0 float-3
            "
            onMouseEnter={() => setHovered("water")}
            onMouseLeave={() => setHovered(null)}
            style={{ zIndex: hovered === "water" ? 30 : 20 }}
          >
            <div className="relative diamond ring-pulse">
              <img
                src={waterImages[waterIndex]}
                alt="Water Adventure"
                onLoad={() => onImgLoad("water")}
                className={`
                  img-fade ${loaded.water ? "loaded" : ""}
                  w-full h-full object-cover
                  transition-transform duration-300 ease-out
                  ${hovered === "water" ? "scale-[1.08]" : "hover:scale-[1.03]"}
                `}
                draggable={false}
              />
              <div className="pointer-events-none absolute inset-0 rounded-3xl" style={{
                boxShadow: "inset 0 0 0 2px rgba(96,165,250,.55), 0 0 28px rgba(96,165,250,.28)"
              }} />
            </div>

            {hovered === "water" && (
              <div
                className="
                  absolute left-1/2 top-full mt-3 -translate-x-1/2
                  bg-white/90 text-fuchsia-900 rounded-xl shadow-lg px-4 py-2
                  text-center text-sm font-semibold whitespace-nowrap
                "
                role="tooltip"
              >
                <div>{adventureDescriptions.water.type}</div>
                <div className="text-xs font-normal text-sky-700">
                  {adventureDescriptions.water.thing}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

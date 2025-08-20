import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const AutoHoverTriangle = () => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [particleEffect, setParticleEffect] = useState(false);
  const animationRef = useRef();
  const navigate = useNavigate();
  const [shineAngle, setShineAngle] = useState(0);
  const [shineAngle2, setShineAngle2] = useState(0);
  const [shineAngle3, setShineAngle3] = useState(0);
  const [globeScale, setGlobeScale] = useState(1);
  const [globeRotation, setGlobeRotation] = useState(0);
  const [clickedZone, setClickedZone] = useState(null);
  const popupRef = useRef(null);
  const containerRef = useRef();

  // Triangle vertex labels and colors
  const points = {
    A: { x: 300, y: 80, name: 'Air Adventure', color: 'bg-blue-500' },
    B: { x: 80, y: 360, name: 'Water Adventure', color: 'bg-cyan-500' },
    C: { x: 520, y: 360, name: 'Land Adventure', color: 'bg-amber-500' },
    G: { x: 300, y: 260, name: 'Central Hub', color: 'bg-emerald-700' }
  };

  const zoneNames = {
    AGB: 'Air ',
    AGC: 'Water ',
    BGC: 'Land '
  };

  const zoneActivities = {
    AGB: ['Paragliding', 'Zip Line', 'Sky Diving'],
    AGC: ['River Rafting', 'Scuba Diving', 'Jet Skiing'],
    BGC: ['Rock Climbing', 'Off-Roading', 'Forest Trekking']
  };

  // Outer rotating text
  useEffect(() => {
    const animate = () => {
      setRotationAngle(prev => (prev + 0.5) % 360);
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  // Shine & globe micro animations
  useEffect(() => {
    let raf1, raf2;
    const loop1 = () => {
      setShineAngle(p => (p + 1.5) % 360);
      setShineAngle2(p => (p - 0.8 + 360) % 360);
      setShineAngle3(p => (p + 2.4) % 360);
      raf1 = requestAnimationFrame(loop1);
    };
    const loop2 = (t0 => (t) => {
      const elapsed = (t - t0) / 1000;
      const scale = 1 + 0.12 * Math.sin(elapsed * 2.1);
      setGlobeScale(scale);
      setGlobeRotation(r => (r + 0.8) % 360);
      raf2 = requestAnimationFrame(loop2(t0));
    })(performance.now());
    raf1 = requestAnimationFrame(loop1);
    raf2 = requestAnimationFrame(loop2);
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, []);

  // Equilateral triangle geometry
  const cx = 300;
  const cy = 320;
  const R = 220; // outer circle radius
  const angles = [-90, 30, 150];
  const toRad = (deg) => (deg * Math.PI) / 180;
  const TRIANGLE_VERTICES = angles.map(angle => ({
    x: cx + R * Math.cos(toRad(angle)),
    y: cy + R * Math.sin(toRad(angle)),
  }));
  const TRIANGLE_PATH = `M${TRIANGLE_VERTICES[0].x},${TRIANGLE_VERTICES[0].y} L${TRIANGLE_VERTICES[1].x},${TRIANGLE_VERTICES[1].y} L${TRIANGLE_VERTICES[2].x},${TRIANGLE_VERTICES[2].y} Z`;
  const globeRadius = 110;

  // Interactions
  const handleBookNow = (activity) => {
    localStorage.setItem('adventureFilter', activity);
    navigate('/booking', { state: { activity } });
  };

  // Handle vertex clicks
  const handleZoneClick = (zone) => {
    setClickedZone(prev => prev === zone ? null : zone);
    setParticleEffect(true);
    setTimeout(() => setParticleEffect(false), 300);
  };

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current && 
        !popupRef.current.contains(event.target) &&
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setClickedZone(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Reusable particle burst
  const ParticleEffect = ({ x, y, color = '#fff' }) => {
    const particles = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      angle: (i * 360) / 18,
      distance: Math.random() * 26 + 16,
    }));

    return (
      <g transform={`translate(${x},${y})`}>
        {particles.map((p) => {
          const rad = (p.angle * Math.PI) / 180;
          const px = Math.cos(rad) * p.distance;
          const py = Math.sin(rad) * p.distance;
          return (
            <circle
              key={p.id}
              cx={px}
              cy={py}
              r="2.4"
              fill={color}
              opacity="0.6"
            />
          );
        })}
      </g>
    );
  };

  // Responsive popup positioning
  const getPopupStyle = (zone) => {
    if (window.innerWidth < 768) {
      return { 
        left: '50%', 
        top: '50%',
        transform: 'translate(-50%, -50%)'
      };
    }
    
    if (zone === 'AGB') {
      return { 
        left: '50%', 
        top: '20%',
        transform: 'translate(-50%, -100%)'
      };
    } else if (zone === 'AGC') {
      return { 
        left: '20%', 
        top: '76.6%',
        transform: 'translate(-100%, -50%)'
      };
    } else if (zone === 'BGC') {
      return { 
        left: '80%', 
        top: '76.6%',
        transform: 'translate(0, -50%)'
      };
    }
    return {};
  };

  const circularText = 'Adventure Triangle  ';

  return (
    <div className="relative" id="triangle-section">
      {/* Full-bleed gradient background (NO images) */}
      <div className="fixed inset-0 z-0 h-screen bg-[radial-gradient(1200px_600px_at_50%_10%,#0ea5e91a,transparent_60%),conic-gradient(from_220deg_at_50%_40%,#1e293b_0%,#0f172a_45%,#111827_60%,#0b1020_80%,#0f172a_100%)]" />

      {/* Subtle moving noise overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.06] mix-blend-overlay" style={{
        backgroundImage:
          'radial-gradient(#ffffff 1px, transparent 1px), radial-gradient(#ffffff 1px, transparent 1px)',
        backgroundSize: '24px 24px, 24px 24px',
        backgroundPosition: '0 0, 12px 12px'
      }} />

      {/* Content */}
      <div className="relative z-10">
        {/* Hero / Interactive Triangle */}
        <div className="min-h-screen flex flex-col justify-center">
          <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 md:mb-10 bg-gradient-to-r from-indigo-300 via-sky-300 to-cyan-300 bg-clip-text text-transparent pt-8 md:pt-12 tracking-tight">
              Adventure Triangle
            </h1>

            <p className="max-w-2xl mx-auto text-center text-slate-300/90 mb-8 md:mb-10 px-4 text-sm md:text-base">
              Discover. Connect. Experience. Curated adventures across Air, Water, and Land—crafted for thrill, powered by safety.
            </p>

            <div 
              ref={containerRef}
              className="relative h-[500px] md:h-[600px] w-full max-w-4xl mx-auto mb-8 md:mb-12 rounded-3xl border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] bg-white/5 backdrop-blur-xl"
            >
              <svg className="w-full h-full" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid meet">
                <defs>
                  {/* Triangle path gradients for animated rim light */}
                  <linearGradient id="triangle-shine" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                    <stop offset="40%" stopColor="#60a5fa" stopOpacity="0.7" />
                    <stop offset="60%" stopColor="#fff" stopOpacity="1" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                  </linearGradient>
                  <linearGradient id="triangle-shine2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(96,165,250,0)" />
                    <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.6" />
                    <stop offset="80%" stopColor="#fff" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="rgba(96,165,250,0)" />
                  </linearGradient>
                  <linearGradient id="triangle-shine3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                    <stop offset="30%" stopColor="#818cf8" stopOpacity="0.7" />
                    <stop offset="70%" stopColor="#fff" stopOpacity="1" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                  </linearGradient>

                  {/* Globe gradients (vector only) */}
                  <radialGradient id="oceanGradient3D" cx="45%" cy="40%" r="70%">
                    <stop offset="0%" stopColor="#b6e0fe" />
                    <stop offset="60%" stopColor="#38bdf8" />
                    <stop offset="90%" stopColor="#0ea5e9" />
                    <stop offset="100%" stopColor="#0369a1" />
                  </radialGradient>
                  <radialGradient id="globeHighlight3D" cx="30%" cy="25%" r="50%">
                    <stop offset="0%" stopColor="#fff" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="globeAtmosphere3D" cx="50%" cy="50%" r="80%">
                    <stop offset="60%" stopColor="#7dd3fc" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.05" />
                  </radialGradient>
                  <filter id="globeShadow3D" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="7" />
                    <feOffset dx="16" dy="16" result="offsetblur" />
                    <feComponentTransfer><feFuncA type="linear" slope="0.22" /></feComponentTransfer>
                    <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>

                  {/* Soft radial spotlight behind triangle */}
                  <radialGradient id="sceneGlow" cx="50%" cy="55%" r="60%">
                    <stop offset="0%" stopColor="#60a5fa20" />
                    <stop offset="60%" stopColor="#0ea5e915" />
                    <stop offset="100%" stopColor="#00000000" />
                  </radialGradient>
                </defs>

                {/* Scene ambient glow */}
                <circle cx="300" cy="320" r="260" fill="url(#sceneGlow)" />

                {/* Animated rim lights around main triangle */}
                <g style={{ transform: `rotate(${shineAngle}deg)`, transformOrigin: '300px 320px' }}>
                  <path d={TRIANGLE_PATH} fill="none" stroke="url(#triangle-shine)" strokeWidth="32" strokeLinejoin="round" strokeLinecap="round" style={{ filter: 'blur(1.2px)' }} />
                </g>
                <g style={{ transform: `rotate(${shineAngle2}deg)`, transformOrigin: '300px 320px' }}>
                  <path d={TRIANGLE_PATH} fill="none" stroke="url(#triangle-shine2)" strokeWidth="22" strokeLinejoin="round" strokeLinecap="round" style={{ filter: 'blur(1px)' }} />
                </g>
                <g style={{ transform: `rotate(${shineAngle3}deg)`, transformOrigin: '300px 320px' }}>
                  <path d={TRIANGLE_PATH} fill="none" stroke="url(#triangle-shine3)" strokeWidth="16" strokeLinejoin="round" strokeLinecap="round" style={{ filter: 'blur(0.8px)' }} />
                </g>

                {/* Main white triangle with a stylish gap */}
                <g>
                  <path d={TRIANGLE_PATH} fill="none" stroke="#fff" strokeWidth="22" strokeLinejoin="round" strokeLinecap="round" />
                  <path
                    d={`M${TRIANGLE_VERTICES[0].x},${TRIANGLE_VERTICES[0].y} L${(TRIANGLE_VERTICES[2].x + TRIANGLE_VERTICES[0].x) / 2},${(TRIANGLE_VERTICES[2].y + TRIANGLE_VERTICES[0].y) / 2}`}
                    fill="none" stroke="#0f172a" strokeWidth="18" strokeLinecap="round"
                  />
                </g>

                {/* Center "T" emblem (pickaxe vibe) */}
                <g>
                  <rect x="285" y="270" width="30" height="90" rx="12" fill="#fff" />
                  <rect x="250" y="270" width="100" height="20" rx="10" fill="#fff" />
                  <path d="M295 290 Q290 280 270 280" stroke="#fff" strokeWidth="7" fill="none" strokeLinecap="round" />
                  <path d="M305 290 Q310 280 330 280" stroke="#fff" strokeWidth="7" fill="none" strokeLinecap="round" />
                </g>

                {/* Vertex labels - clickable */}
                <g onClick={() => handleZoneClick('AGB')} className="cursor-pointer">
                  <text 
                    x="300" 
                    y="165" 
                    textAnchor="middle" 
                    fontSize="28" 
                    fontWeight="bold" 
                    fill="#fff" 
                    className="hover:opacity-80 transition-opacity"
                    style={{ fontFamily: 'serif' }}
                  >
                    Air
                  </text>
                </g>
                <g onClick={() => handleZoneClick('AGC')} className="cursor-pointer">
                  <text 
                    x="200" 
                    y="485" 
                    textAnchor="middle" 
                    fontSize="28" 
                    fontWeight="bold" 
                    fill="#fff" 
                    className="hover:opacity-80 transition-opacity"
                    style={{ fontFamily: 'serif' }}
                  >
                    Water
                  </text>
                </g>
                <g onClick={() => handleZoneClick('BGC')} className="cursor-pointer">
                  <text 
                    x="400" 
                    y="485" 
                    textAnchor="middle" 
                    fontSize="28" 
                    fontWeight="bold" 
                    fill="#fff" 
                    className="hover:opacity-80 transition-opacity"
                    style={{ fontFamily: 'serif' }}
                  >
                    Land
                  </text>
                </g>

                {/* Rotating circular text (pure vector) */}
                <g transform={`rotate(${-rotationAngle}, 300, 320)`}>
                  {Array.from(circularText.repeat(7)).map((char, index) => {
                    const angle = (index * 360 / (circularText.length * 1.4)) - 90;
                    const rad = angle * (Math.PI / 180);
                    const radius = 220;
                    const x = 300 + radius * Math.cos(rad);
                    const y = 320 + radius * Math.sin(rad);
                    return (
                      <text
                        key={index}
                        x={x}
                        y={y}
                        textAnchor="middle"
                        fill="#4F46E5"
                        fontSize="30"
                        fontWeight="bold"
                        opacity={index < 3 ? 0 : 1}
                        transform={`rotate(${angle + 90}, ${x}, ${y})`}
                        style={{ fontFamily: 'serif' }}
                      >
                        {char}
                      </text>
                    );
                  })}
                </g>

                {/* Vector globe (no images) */}
                <g transform={`translate(300, 320) scale(${globeScale})`} style={{ transition: 'transform 0.12s linear' }}>
                  <ellipse cx="18" cy="30" rx={globeRadius * 0.5} ry="16" fill="#0ea5e9" opacity="0.25" filter="url(#globeShadow3D)" />
                  <g transform={`rotate(${globeRotation})`}>
                    {/* Ocean */}
                    <circle r={globeRadius} fill="url(#oceanGradient3D)" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />

                    {/* Longitudes & Latitudes */}
                    {Array.from({ length: 12 }).map((_, i) => {
                      const a = (i / 12) * Math.PI;
                      const rx = globeRadius * Math.cos(a);
                      return (
                        <ellipse key={`lon-${i}`} cx="0" cy="0" rx={rx} ry={globeRadius} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
                      );
                    })}
                    {Array.from({ length: 7 }).map((_, i) => {
                      const lat = ((i - 3) / 3) * (globeRadius * 0.85);
                      const r = Math.sqrt(Math.max(globeRadius * globeRadius - lat * lat, 0));
                      return (
                        <ellipse key={`lat-${i}`} cx="0" cy={lat} rx={r} ry={r * 0.18} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
                      );
                    })}

                    {/* Highlight & atmosphere */}
                    <ellipse cx={-globeRadius * 0.23} cy={-globeRadius * 0.27} rx={globeRadius * 0.22} ry={globeRadius * 0.1} fill="url(#globeHighlight3D)" opacity="0.7" />
                    <circle r={globeRadius + 5} fill="url(#globeAtmosphere3D)" opacity="0.7" />
                    <circle r={globeRadius + 2} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
                  </g>
                </g>

                {/* Click zones */}
                <polygon
                  points={`${points.A.x},${points.A.y} ${points.G.x},${points.G.y} ${points.B.x},${points.B.y}`}
                  fill="transparent"
                  onClick={() => handleZoneClick('AGB')}
                  style={{ cursor: 'pointer' }}
                />
                <polygon
                  points={`${points.A.x},${points.A.y} ${points.G.x},${points.G.y} ${points.C.x},${points.C.y}`}
                  fill="transparent"
                  onClick={() => handleZoneClick('AGC')}
                  style={{ cursor: 'pointer' }}
                />
                <polygon
                  points={`${points.B.x},${points.B.y} ${points.G.x},${points.G.y} ${points.C.x},${points.C.y}`}
                  fill="transparent"
                  onClick={() => handleZoneClick('BGC')}
                  style={{ cursor: 'pointer' }}
                />

                {/* Particle burst on click */}
                {particleEffect && clickedZone === 'AGB' && <ParticleEffect x={(points.A.x + points.G.x + points.B.x) / 3} y={(points.A.y + points.G.y + points.B.y) / 3} color="#93c5fd" />}
                {particleEffect && clickedZone === 'AGC' && <ParticleEffect x={(points.A.x + points.G.x + points.C.x) / 3} y={(points.A.y + points.G.y + points.C.y) / 3} color="#67e8f9" />}
                {particleEffect && clickedZone === 'BGC' && <ParticleEffect x={(points.B.x + points.G.x + points.C.x) / 3} y={(points.B.y + points.G.y + points.C.y) / 3} color="#fbbf24" />}

                {/* Quote */}
                <text x="300" y="570" textAnchor="middle" fontSize="20" fill="#e5e7eb" fontWeight="600" style={{ fontFamily: 'serif' }}>
                  “Discover. Connect. Experience. Adventure, anywhere.”
                </text>
              </svg>

              {/* Popup Component */}
              {clickedZone && (
                <div 
                  ref={popupRef}
                  className="absolute p-5 md:p-6 rounded-2xl backdrop-blur-lg border border-white/15 shadow-2xl bg-gradient-to-br from-white/90 to-white/70 text-slate-900"
                  style={{
                    ...getPopupStyle(clickedZone),
                    width: 'min(320px, 90vw)',
                    maxWidth: 'calc(100% - 2rem)',
                    zIndex: 10
                  }}
                >
                  <button
                    onClick={() => setClickedZone(null)}
                    className="absolute top-3 right-3 w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center text-sm hover:bg-slate-900"
                  >
                    ×
                  </button>
                  
                  <div className="mb-4">
                    <div className={`h-10 w-10 rounded-xl ${
                      clickedZone === 'AGB' ? 'bg-gradient-to-r from-blue-500 to-indigo-500' : 
                      clickedZone === 'AGC' ? 'bg-gradient-to-r from-cyan-500 to-teal-500' : 
                      'bg-gradient-to-r from-amber-500 to-orange-500'
                    } shadow-md`} />
                  </div>

                  <h3 className="font-extrabold text-xl md:text-2xl mb-3 tracking-tight">
                    {zoneNames[clickedZone]} Adventures
                  </h3>
                  <p className="text-slate-600 text-xs md:text-sm mb-4">
                    Handpicked activities with trained experts and verified safety standards.
                  </p>

                  <ul className="space-y-2.5 mb-5">
                    {zoneActivities[clickedZone].map((activity, index) => (
                      <li key={index} className="flex items-center justify-between gap-3 p-2 md:p-3 rounded-lg bg-slate-900/5 hover:bg-slate-900/10 transition-colors">
                        <div className="flex items-center gap-2 md:gap-3">
                          <span className="inline-flex h-2 w-2 md:h-2.5 md:w-2.5 rounded-full bg-slate-900" />
                          <span className="font-medium text-sm md:text-base">{activity}</span>
                        </div>
                        <button
                          onClick={() => handleBookNow(activity)}
                          className="px-2 py-1 text-xs md:text-sm rounded-md bg-slate-900 text-white hover:opacity-90"
                        >
                          Book
                        </button>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleBookNow(zoneNames[clickedZone] + 'Package')}
                    className="w-full py-2 px-4 rounded-lg font-bold bg-gradient-to-r from-slate-900 to-indigo-700 text-white hover:opacity-95 text-sm md:text-base"
                  >
                    See All Activities
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info sections (image-free) */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/0 pointer-events-none" />
          <div className="container mx-auto px-4 py-10 md:py-16">
            <div className="max-w-4xl mx-auto text-slate-200">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">About Adventure Triangle</h2>
              <div className="space-y-4 text-base md:text-lg text-slate-300/90">
                <p>
                  Adventure Triangle curates experiences across three zones—Air, Water, and Land—pairing world-class guides with rigorous safety.
                </p>
                <p>
                  Whether you’re a first-timer or seasoned explorer, our verified hosts deliver unforgettable journeys, tailored to your comfort and challenge levels.
                </p>
                <p>
                  Plan, book, and manage certifications in one place. Your next story starts here.
                </p>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 pb-12 md:pb-20">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-10 text-center text-slate-200">Our Adventure Zones</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  title: 'Air Adventures',
                  description: 'Soar above it all. Feel the rush and the quiet in the same breath.',
                  activities: ['Paragliding', 'Skydiving', 'Zip Lining', 'Hot Air Balloon'],
                  ring: 'from-blue-400 to-indigo-500'
                },
                {
                  title: 'Water Adventures',
                  description: 'Ride the rapids or slip beneath the surface into calm blue worlds.',
                  activities: ['White Water Rafting', 'Scuba Diving', 'Jet Skiing', 'Kayaking'],
                  ring: 'from-cyan-400 to-teal-500'
                },
                {
                  title: 'Land Adventures',
                  description: 'Test your grit on rock, trail, and terrain. Grounded, yet wild.',
                  activities: ['Rock Climbing', 'Mountain Biking', 'Off-Roading', 'Forest Trekking'],
                  ring: 'from-amber-400 to-emerald-500'
                }
              ].map((zone, i) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
                  <div className={`h-1.5 bg-gradient-to-r ${zone.ring}`} />
                  <div className="p-5 md:p-6">
                    <h4 className="text-xl md:text-2xl font-bold text-white mb-2">{zone.title}</h4>
                    <p className="text-slate-300 mb-3 md:mb-4 text-sm md:text-base">{zone.description}</p>
                    <ul className="space-y-2 mb-4 md:mb-6">
                      {zone.activities.map((a, idx) => (
                        <li key={idx} className="flex items-center">
                          <span className="h-1.5 w-1.5 rounded-full bg-white mr-2" />
                          <span className="text-slate-100 text-sm md:text-base">{a}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      className={`w-full py-2 md:py-3 px-4 md:px-6 rounded-lg font-bold bg-gradient-to-r ${zone.ring} hover:opacity-95 text-slate-900 text-sm md:text-base`}
                      onClick={() => handleBookNow(zone.title)}
                    >
                      Explore {zone.title}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AutoHoverTriangle;
##   circle  will   be  larger  
##    image  will  be  change  according  to   their  region  
##  example   Activity..



##  triangle escapes   drop  down   element Air , water  and   
##   aCTIVITY  ,  BOOKING   INSTEAD  OF    ,   24*7   RATING  AND FEEDBACK  
##    ALL   ACTIVITY  MANAGE  ALL   PARTNERS  
###  TRUSTED  BY THOUSAND  OUR  PARTNER   


###    LISTED   BY   NO       IMAGE    BBOK   NOW      CLICK   


###  TRIANGLE   WILL    BE  MORE    

##   22/04

what  is  new  in  Himrahi   
after     contact   in  which  client  contact   
footer   
Triangles       Escapes    
we  show  activity    See   more   ...
About  us  
blog    
latest  news  
  
  carrer
  diversity   
  Our   partner  

  only  touch     their  circumference      of  hero   section   
  

  import { useState, useEffect, useRef } from 'react';

const AutoHoverTriangle = () => {
  const [hoveredZone, setHoveredZone] = useState(null);
  const [autoHoverActive, setAutoHoverActive] = useState(true);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const animationRef = useRef();

  // Enhanced images with adventure-themed pictures
  const zoneImages = {
    AGB: [
      "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1518632618335-df838848f9f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    AGC: [
      "https://images.unsplash.com/photo-1504470695779-75300268aa0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1513415277900-a62401e19be4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    BGC: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1501554728187-ce583db33af7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ]
  };

  // Triangle points with enhanced styling
  const points = {
    A: { 
      x: 300, y: 80, 
      name: "Air Adventure", 
      color: "bg-blue-500",
      icon: "✈️"
    },
    B: { 
      x: 80, y: 360, 
      name: "Water Adventure", 
      color: "bg-teal-500",
      icon: "🌊"
    },
    C: { 
      x: 520, y: 360, 
      name: "Land Adventure", 
      color: "bg-green-500",
      icon: "⛰️"
    },
    G: { 
      x: 300, y: 260, 
      name: "Central Hub", 
      color: "bg-purple-600",
      icon: "✨"
    }
  };

  const zoneNames = {
    AGB: "Air Adventures",
    AGC: "Water Adventures", 
    BGC: "Land Adventures"
  };

  const zoneActivities = {
    AGB: ["Paragliding", "Zip Line", "Sky Diving"],
    AGC: ["River Rafting", "Scuba Diving", "Jet Skiing"],
    BGC: ["Rock Climbing", "Off-Roading", "Forest Trekking"]
  };

  // Calculate zone centers
  const zoneCenters = {
    AGB: {
      x: (points.A.x + points.G.x + points.B.x) / 3,
      y: (points.A.y + points.G.y + points.B.y) / 3,
    },
    AGC: {
      x: (points.A.x + points.G.x + points.C.x) / 3,
      y: (points.A.y + points.G.y + points.C.y) / 3,
    },
    BGC: {
      x: (points.B.x + points.G.x + points.C.x) / 3,
      y: (points.B.y + points.G.y + points.C.y) / 3,
    },
  };

  // Auto-hover effect with image cycling
  useEffect(() => {
    if (!autoHoverActive) return;

    const zones = ['AGB', 'AGC', 'BGC'];
    let currentIndex = 0;

    const interval = setInterval(() => {
      setHoveredZone(zones[currentIndex]);
      
      // Cycle through images for the current zone
      const imageInterval = setInterval(() => {
        setImageIndex(prev => (prev + 1) % 3);
      }, 3000);
      
      setTimeout(() => {
        clearInterval(imageInterval);
      }, 6000);
      
      currentIndex = (currentIndex + 1) % zones.length;
      
      if (currentIndex === 0) {
        setTimeout(() => {
          setAutoHoverActive(false);
          setHoveredZone(null);
        }, 6000);
        clearInterval(interval);
      }
    }, 7000);

    return () => clearInterval(interval);
  }, [autoHoverActive]);

  // Animation for rotating circular text
  useEffect(() => {
    const animate = () => {
      setRotationAngle(prevAngle => (prevAngle + 0.5) % 360);
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  // Create circular text
  const circularText = "HimRahi Adventures • Thrills • Excitement • Memories • ";
  const radius = 240;
  const centerX = 300;
  const centerY = 220;

  // Handle book now click
  const handleBookNow = (activity) => {
    alert(`Booking ${activity} now!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 bg-clip-text text-transparent py-4">
          Adventure Triangle Park
        </h1>
        <p className="text-center text-white/80 text-xl mb-12 max-w-3xl mx-auto">
          Explore our three realms of adventure - Air, Water, and Land. Each zone offers unique 
          experiences that will get your adrenaline pumping!
        </p>

        <div className="relative h-[700px] w-full max-w-5xl mx-auto mb-12">
          <svg 
            className="w-full h-full"
            viewBox="0 0 600 450"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Gradient Definitions */}
            <defs>
              <linearGradient id="zoneGradientAGB" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
                <stop offset="100%" stopColor="rgba(99, 102, 241, 0.1)" />
              </linearGradient>
              <linearGradient id="zoneGradientAGC" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(20, 184, 166, 0.3)" />
                <stop offset="100%" stopColor="rgba(6, 182, 212, 0.1)" />
              </linearGradient>
              <linearGradient id="zoneGradientBGC" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(34, 197, 94, 0.3)" />
                <stop offset="100%" stopColor="rgba(22, 163, 74, 0.1)" />
              </linearGradient>
              
              {/* Glow effects */}
              <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Rotating circular text */}
            <g transform={`rotate(${rotationAngle}, ${centerX}, ${centerY})`}>
              {Array.from(circularText.repeat(3)).map((char, index) => {
                const angle = (index * 360 / circularText.length) - 90;
                const radian = angle * (Math.PI / 180);
                const x = centerX + radius * Math.cos(radian);
                const y = centerY + radius * Math.sin(radian);
                
                return (
                  <text
                    key={index}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.7)"
                    fontSize="14"
                    fontWeight="600"
                    transform={`rotate(${angle + 90}, ${x}, ${y})`}
                    className="font-mono tracking-wider"
                  >
                    {char}
                  </text>
                );
              })}
            </g>

            {/* Connecting lines with animation */}
            {['AG', 'BG', 'CG'].map((line) => (
              <line
                key={line}
                x1={points[line[0]].x}
                y1={points[line[0]].y}
                x2={points[line[1]].x}
                y2={points[line[1]].y}
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            ))}

            {/* Zone Polygons with individual gradients */}
            {['AGB', 'AGC', 'BGC'].map((key) => (
              <g key={key}>
                <polygon
                  points={
                    key === 'AGB'
                      ? `${points.A.x},${points.A.y} ${points.G.x},${points.G.y} ${points.B.x},${points.B.y}`
                      : key === 'AGC'
                        ? `${points.A.x},${points.A.y} ${points.G.x},${points.G.y} ${points.C.x},${points.C.y}`
                        : `${points.B.x},${points.B.y} ${points.G.x},${points.G.y} ${points.C.x},${points.C.y}`
                  }
                  fill={`url(#zoneGradient${key})`}
                  stroke={hoveredZone === key ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.2)'}
                  strokeWidth={hoveredZone === key ? '4' : '2'}
                  onMouseEnter={() => {
                    setHoveredZone(key);
                    setAutoHoverActive(false);
                    setImageIndex(0);
                  }}
                  onMouseLeave={() => setHoveredZone(null)}
                  className="cursor-pointer transition-all duration-500"
                  style={{ 
                    pointerEvents: 'fill',
                    filter: hoveredZone === key ? 'drop-shadow(0 0 20px rgba(255,255,255,0.3))' : 'none'
                  }}
                />
                
                {/* Subtle floating particles in zones */}
                {Array.from({ length: 15 }).map((_, i) => {
                  // Random position within the zone
                  const x = zoneCenters[key].x + (Math.random() * 100 - 50);
                  const y = zoneCenters[key].y + (Math.random() * 80 - 40);
                  
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r={Math.random() * 1.5}
                      fill="rgba(255,255,255,0.3)"
                      className={`transition-all duration-1000 ${hoveredZone === key ? 'opacity-100' : 'opacity-0'}`}
                      style={{
                        animation: `float ${3 + Math.random() * 4}s infinite ease-in-out`
                      }}
                    />
                  );
                })}
              </g>
            ))}

            {/* Zone Names with better typography */}
            {['AGB', 'AGC', 'BGC'].map((key) => (
              <text
                key={key}
                x={zoneCenters[key].x}
                y={zoneCenters[key].y + 4}
                textAnchor="middle"
                className={`font-bold text-2xl ${
                  key === 'AGB' ? 'fill-blue-300' : 
                  key === 'AGC' ? 'fill-teal-300' : 'fill-green-300'
                }`}
                style={{ 
                  textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                  opacity: hoveredZone === key ? 1 : 0.7,
                  transition: 'opacity 0.3s ease'
                }}
              >
                {zoneNames[key]}
              </text>
            ))}

            {/* Vertex Points with enhanced styling */}
            {['A', 'B', 'C', 'G'].map((key) => (
              <g 
                key={key} 
                transform={`translate(${points[key].x},${points[key].y})`}
                className="transition-transform duration-300 hover:scale-125"
                onMouseEnter={() => {
                  if (key !== 'G') {
                    setHoveredZone(key === 'A' ? 'AGB' : key === 'B' ? 'AGB' : 'BGC');
                    setAutoHoverActive(false);
                  }
                }}
              >
                {/* Glowing circle */}
                <circle
                  r="20"
                  fill={points[key].color}
                  fillOpacity="0.2"
                  className={`${hoveredZone && hoveredZone.includes(key) ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
                  filter="url(#glow)"
                />
                
                {/* Main point */}
                <circle
                  r="12"
                  fill={points[key].color}
                  stroke="white"
                  strokeWidth="2"
                />
                
                {/* Icon */}
                <text
                  x="0"
                  y="5"
                  textAnchor="middle"
                  fill="white"
                  fontSize="16"
                  fontWeight="bold"
                >
                  {points[key].icon}
                </text>
                
                {/* Point name */}
                <text
                  x="0"
                  y={key === 'A' ? -30 : 40}
                  textAnchor="middle"
                  fill="white"
                  fontSize="14"
                  fontWeight="600"
                  className="opacity-80"
                >
                  {points[key].name}
                </text>
              </g>
            ))}
          </svg>

          {/* Enhanced Activity Display with Images and Book Now Button */}
          {hoveredZone && (
            <div 
              className={`absolute p-8 rounded-3xl backdrop-blur-xl border-2 border-white/30 shadow-2xl ${
                hoveredZone === 'AGB' ? 'bg-blue-900/40' :
                hoveredZone === 'AGC' ? 'bg-teal-900/40' : 'bg-green-900/40'
              } text-white transition-all duration-500`}
              style={{
                left: `${points.G.x - 180}px`,
                top: `${points.G.y + 40}px`,
                width: '380px',
                zIndex: 10,
                animation: 'fadeIn 0.5s ease-out'
              }}
            >
              <h3 className="font-bold text-3xl mb-6 flex items-center gap-3">
                <span className={`p-4 rounded-xl ${
                  hoveredZone === 'AGB' ? 'bg-blue-600/50' :
                  hoveredZone === 'AGC' ? 'bg-teal-600/50' : 
                  'bg-green-600/50'
                }`}>
                  {zoneNames[hoveredZone]}
                </span>
              </h3>
              
              {/* Activity Images Carousel with fade effect */}
              <div className="mb-6 relative h-48 rounded-xl overflow-hidden shadow-lg">
                {zoneImages[hoveredZone].map((img, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                      index === imageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img
                      src={img}
                      alt={zoneActivities[hoveredZone][index]}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white font-bold text-xl">
                      {zoneActivities[hoveredZone][index]}
                    </div>
                  </div>
                ))}
                <div className="absolute bottom-4 right-4 flex gap-2">
                  {[0, 1, 2].map((i) => (
                    <button
                      key={i}
                      onClick={() => setImageIndex(i)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        i === imageIndex ? 'bg-white w-6' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <ul className="space-y-4 mb-6">
                {zoneActivities[hoveredZone].map((activity, index) => (
                  <li 
                    key={index}
                    className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-colors border border-white/10"
                  >
                    <div className="flex items-center gap-4">
                      <span className={`text-2xl ${
                        hoveredZone === 'AGB' ? 'text-blue-300' :
                        hoveredZone === 'AGC' ? 'text-teal-300' : 'text-green-300'
                      }`}>✦</span>
                      <span className="font-medium">{activity}</span>
                    </div>
                    <button
                      onClick={() => handleBookNow(activity)}
                      className={`px-4 py-2 rounded-lg font-medium ${
                        hoveredZone === 'AGB' ? 'bg-blue-600 hover:bg-blue-700' :
                        hoveredZone === 'AGC' ? 'bg-teal-600 hover:bg-teal-700' : 
                        'bg-green-600 hover:bg-green-700'
                      } transition-colors shadow-md hover:shadow-lg`}
                    >
                      Book Now
                    </button>
                  </li>
                ))}
              </ul>
              
              {/* Package Deal */}
              <div className="bg-black/20 p-4 rounded-xl mb-6 border border-white/10">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-lg">Full Package Deal</h4>
                    <p className="text-sm opacity-80">All 3 activities + gear</p>
                  </div>
                  <span className="text-xl font-bold">
                    ${hoveredZone === 'AGB' ? '299' : hoveredZone === 'AGC' ? '349' : '279'}
                  </span>
                </div>
              </div>
              
              {/* Book All Button */}
              <button
                onClick={() => handleBookNow(zoneNames[hoveredZone] + " Package")}
                className={`w-full py-3 px-6 rounded-xl font-bold text-lg flex items-center justify-center gap-2 ${
                  hoveredZone === 'AGB' ? 'bg-blue-600 hover:bg-blue-700' :
                  hoveredZone === 'AGC' ? 'bg-teal-600 hover:bg-teal-700' : 
                  'bg-green-600 hover:bg-green-700'
                } transition-colors shadow-xl hover:scale-[1.02] transition-transform`}
              >
                <span>Book Complete Package</span>
                <span>→</span>
              </button>
            </div>
          )}
        </div>

        {/* Reset Auto Tour Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => {
              setAutoHoverActive(true);
              setHoveredZone(null);
            }}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-full text-white font-medium shadow-lg transition-all hover:shadow-xl"
          >
            Restart Zone Tour
          </button>
        </div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default AutoHoverTriangle;


//Booking  
// AdventureCard.js
import { FaHeart, FaStar, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from '@clerk/clerk-react';

export default function AdventureCard({ adventure, layout = "grid" }) {
  const { user } = useUser();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate();

  // Use a key that is unique per user (if signed in)
  const wishlistKey = user ? `wishlist_${user.id}` : 'wishlist_guest';

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];
    setIsWishlisted(wishlist.includes(adventure.id));
    // eslint-disable-next-line
  }, [user, adventure.id]);

  const toggleWishlist = (e) => {
    e.preventDefault(); // Prevent navigation
    let wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];
    if (wishlist.includes(adventure.id)) {
      wishlist = wishlist.filter(id => id !== adventure.id);
      setIsWishlisted(false);
    } else {
      wishlist.push(adventure.id);
      setIsWishlisted(true);
      localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
      navigate('/wishlist'); // Go to wishlist after adding
      return;
    }
    localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
  };

  return (
    <Link to={`/adventures/${adventure.id}`}>
      <div>
        <img
          src={adventure.image}
          alt={adventure.title}
          loading="lazy"
        />
        <div>
          {adventure.continent}
        </div>
        <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 2 }}>
          <button onClick={toggleWishlist} style={{ background: 'none', border: 'none', cursor: 'pointer' }} aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}>
            <FaHeart color={isWishlisted ? 'red' : 'gray'} fill={isWishlisted ? 'red' : 'none'} size={22} />
          </button>
        </div>
      </div>
      <div>
        <h3>{adventure.title}</h3>
        <div>
          <FaMapMarkerAlt />
          <span>{adventure.location}</span>
        </div>
        {layout !== "topRated" && (
          <div>
            <FaClock />
            <span>{adventure.duration}</span>
            <span>•</span>
            <span>{adventure.difficulty}</span>
          </div>
        )}
        <p>{adventure.price}</p>
        <div>
          <FaStar />
          <span>{adventure.rating}</span>
          <span>{adventure.type}</span>
          {layout === "topRated" && adventure.rating >= 4.8 && (
            <span>
              Top Rated
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}  import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { globalAdventureData } from "./data";
import { useUser, SignIn } from '@clerk/clerk-react';

export default function AdventureDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  const adventure = globalAdventureData.find(item => item.id.toString() === id);
  const [selectedCertification, setSelectedCertification] = useState(null);
  const [totalPrice, setTotalPrice] = useState(adventure?.price || 0);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    persons: 1,
    days: 1,
    startDate: '',
  });

  const certificationOptions = [
    { id: 1, name: "Basic Completion Certificate", difficulty: ["Easy"], price: 20 },
    { id: 2, name: "Adventure Achievement Certificate", difficulty: ["Easy", "Medium"], price: 40 },
    { id: 3, name: "Advanced Explorer Certification", difficulty: ["Medium", "Hard"], price: 60 },
    { id: 4, name: "Universal Adventurer Diploma", difficulty: ["Hard", "Extreme"], price: 100 },
  ];

  const handleCertificationSelect = (cert) => {
    setSelectedCertification(cert);
    setTotalPrice(adventure.price + cert.price);
  };

  const calculateTotalPrice = () => {
    if (!adventure) return 0;
    const basePrice = Number(adventure.price) * bookingDetails.persons * bookingDetails.days;
    const certificationPrice = selectedCertification ? selectedCertification.price : 0;
    return basePrice + certificationPrice;
  };

  const handleBookingFormSubmit = (e) => {
    e.preventDefault();
    const finalPrice = calculateTotalPrice();
    setTotalPrice(finalPrice);
    setShowBookingForm(false);
    navigate('/review-payment', {
      state: {
        adventure,
        certification: selectedCertification,
        totalPrice: finalPrice,
        bookingDetails
      }
    });
  };

  const handleBookNow = () => {
    if (!isSignedIn) {
      navigate('/booking');
      return;
    }
    setShowBookingForm(true);
  };

  const nearbyAdventures = globalAdventureData
    .filter(item => item.continent === adventure?.continent && item.location !== adventure?.location)
    .slice(0, 3);

  const relatedAdventures = globalAdventureData
    .filter(item => item.type === adventure?.type && item.id !== adventure?.id)
    .slice(0, 3);

  if (!adventure) {
    return <div>Adventure not found!</div>;
  }

  return (
    <div>
      <h1>{adventure.title}</h1>
      <p>Rating: {adventure.rating}</p>
      <img src={adventure.image} alt={adventure.title} />

      <div>
        <p>Location: {adventure.location}</p>
        <p>Continent: {adventure.continent}</p>
        <p>Type: {adventure.type}</p>
        <p>Duration: {adventure.duration}</p>
        <p>Difficulty: {adventure.difficulty}</p>
        <p>Group Size: {adventure.groupSize}</p>
        <p>Languages: {adventure.languages}</p>
        <p>Description: {adventure.description}</p>
      </div>

      <div>
        <h3>Included:</h3>
        <ul>
          {(adventure.included && adventure.included.map((item, i) => (
            <li key={i}>{item}</li>
          ))) || (
            <>
              <li>Professional guides with universal training</li>
              <li>All necessary equipment</li>
              <li>Safety briefing and orientation</li>
              <li>Cultural immersion activities</li>
            </>
          )}
        </ul>
      </div>

      <div>
        <h3>Add Certification:</h3>
        <ul>
          {certificationOptions
            .filter(cert => cert.difficulty.includes(adventure.difficulty))
            .map(cert => (
              <li key={cert.id}>
                <label>
                  <input
                    type="radio"
                    name="certification"
                    checked={selectedCertification?.id === cert.id}
                    onChange={() => handleCertificationSelect(cert)}
                  />
                  {cert.name} (+${cert.price})
                </label>
              </li>
            ))}
        </ul>
      </div>

      <div>
        <p>Total Price: ${totalPrice}</p>
        <button onClick={handleBookNow}>
          {selectedCertification ? "Book with Certification" : "Book Now"}
        </button>
      </div>

      {showBookingForm && (
        <form onSubmit={handleBookingFormSubmit}>
          <div>
            <label>Persons:</label>
            <input
              type="number"
              value={bookingDetails.persons}
              onChange={(e) => setBookingDetails({ ...bookingDetails, persons: parseInt(e.target.value) })}
              required
            />
          </div>

          <div>
            <label>Days:</label>
            <input
              type="number"
              value={bookingDetails.days}
              onChange={(e) => setBookingDetails({ ...bookingDetails, days: parseInt(e.target.value) })}
              required
            />
          </div>

          <div>
            <label>Start Date:</label>
            <input
              type="date"
              value={bookingDetails.startDate}
              onChange={(e) => setBookingDetails({ ...bookingDetails, startDate: e.target.value })}
              required
            />
          </div>

          <div>
            <p>Base Price: ${adventure.price * bookingDetails.persons * bookingDetails.days}</p>
            {selectedCertification && <p>Certification: +${selectedCertification.price}</p>}
            <p>Total: ${calculateTotalPrice()}</p>
          </div>

          <button type="submit">Confirm Booking</button>
        </form>
      )}

      <div>
        <h3>Related Adventures:</h3>
        <ul>
          {relatedAdventures.map(item => (
            <li key={item.id} onClick={() => navigate(`/adventures/${item.id}`)}>
              <p>{item.title}</p>
              <p>{item.location}</p>
              <p>{item.price}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Nearby Adventures in {adventure.continent}:</h3>
        <ul>
          {nearbyAdventures.map(item => (
            <li key={item.id} onClick={() => navigate(`/adventures/${item.id}`)}>
              <p>{item.title}</p>
              <p>{item.location}</p>
              <p>{item.price}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}import { FaStar, FaMapMarkerAlt, FaClock, FaUserFriends, FaCheck, FaCalendarAlt } from "react-icons/fa";
import BookingHeader from './BookingHeader';

export default function AdventureDetailPage({ adventure }) {
  if (!adventure) {
    return <div>Loading adventure details...</div>;
  }

  const reviews = [
    { id: 1, name: "Sarah Johnson", rating: 5, comment: "An unforgettable experience! The guides were amazing.", date: "2024-03-15" },
    { id: 2, name: "Mike Thompson", rating: 4, comment: "Great adventure, would recommend to everyone.", date: "2024-03-10" },
    { id: 3, name: "Emma Davis", rating: 5, comment: "The views were breathtaking. Perfect organization.", date: "2024-03-05" }
  ];

  return (
    <div>
      <BookingHeader />

      <div>
        <div>
          <img src={adventure.image} alt={adventure.title} />

          <div>
            <img src={adventure.image} alt="Gallery 1" />
            <img src={adventure.image} alt="Gallery 2" />
            <img src={adventure.image} alt="Gallery 3" />
          </div>
        </div>

        <div>
          <h1>{adventure.title}</h1>
          <div>
            <FaMapMarkerAlt />
            <span>{adventure.location}, {adventure.continent}</span>
          </div>

          <div>
            <div>
              <FaStar />
              <span>{adventure.rating}</span>
            </div>
            <span>{adventure.type}</span>
          </div>

          <div>
            <h2>About this adventure</h2>
            <p>{adventure.description}</p>
          </div>

          <div>
            <div>
              <h3>Duration</h3>
              <p>{adventure.duration}</p>
            </div>
            <div>
              <h3>Difficulty</h3>
              <p>{adventure.difficulty}</p>
            </div>
          </div>

          <div>
            <h2>What's Included</h2>
            <div>
              <div><FaCheck /><span>Professional guide</span></div>
              <div><FaCheck /><span>All necessary equipment</span></div>
              <div><FaCheck /><span>Lunch and snacks</span></div>
              <div><FaCheck /><span>Transportation to/from meeting point</span></div>
              <div><FaCheck /><span>Photos of your adventure</span></div>
            </div>
          </div>

          <div>
            <h2>Additional Details</h2>
            <div>
              <div><FaUserFriends /><span>Group size: 2-8 people</span></div>
              <div><FaClock /><span>Start time: 8:00 AM</span></div>
              <div><FaCalendarAlt /><span>Available: Year-round</span></div>
            </div>
          </div>

          <div>
            <h3>{adventure.price}</h3>
            <button>Book Now</button>
          </div>
        </div>
      </div>

      <div>
        <h2>Customer Reviews</h2>
        <div>
          {reviews.map((review) => (
            <div key={review.id}>
              <div>
                <div>
                  <h3>{review.name}</h3>
                  <div>
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < review.rating ? 'filled' : 'unfilled'}
                      />
                    ))}
                  </div>
                </div>
                <span>{review.date}</span>
              </div>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} // AdventureGrid.js
import AdventureCard from "./AdventureCard";

export default function AdventureGrid({ adventures, title, showCount }) {
  return (
    <div>
      <div>
        <h3>{title}</h3>
        {showCount && (
          <div>
            Showing {adventures.length} adventures
          </div>
        )}
      </div>
      <div>
        {adventures.map((adventure) => (
          <AdventureCard key={adventure.id} adventure={adventure} layout="grid" />
        ))}
      </div>
    </div>
  );
}
 // AdventureSlider.js
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRef } from "react";
import AdventureCard from "./AdventureCard";

export default function AdventureSlider({ adventures, title, viewAllLink }) {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div>
      <div>
        <h3>{title}</h3>
        {viewAllLink && (
          <a href="/adventures">
            View All Adventures →
          </a>
        )}
      </div>

      <div>
        <button onClick={scrollLeft}>
          <FaChevronLeft />
        </button>

        <div ref={sliderRef}>
          {adventures.map((adventure) => (
            <AdventureCard key={adventure.id} adventure={adventure} layout="slider" />
          ))}
        </div>

        <button onClick={scrollRight}>
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { HiOutlineMenu } from 'react-icons/hi';
import { useFilter } from './FilterContext';
import { useUser, UserButton, SignInButton, SignOutButton } from '@clerk/clerk-react';

function BookingHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const { setActiveFilter } = useFilter();
  const { isSignedIn, user } = useUser();

  const tabToType = {
    Air: 'Air Tour',
    Water: 'Water Sports',
    Land: 'Land Adventure',
  };

  return (
    <header>
      {/* Left: Logo */}
      <div>
        <img src="/logo1.svg" alt="Adventure Triangle Logo" />
      </div>

      {/* Center: Navigation Tabs */}
      <nav>
        {['Air', 'Water', 'Land'].map((category) => (
          <button
            key={category}
            onClick={() => setActiveFilter(tabToType[category])}
          >
            {category}
          </button>
        ))}
      </nav>

      {/* Right: Profile + Hamburger */}
      <div>
        {isSignedIn ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <SignInButton mode="modal">
            <button>
              <FaUserCircle />
            </button>
          </SignInButton>
        )}
        <button onClick={toggleMenu}>
          <HiOutlineMenu />
        </button>
      </div>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div>
          <ul>
            <li><a href="#">Become a Partner</a></li>
            <li><a href="#">Wishlist</a></li>
            <li><a href="#">Trips</a></li>
            <li><a href="#">Message</a></li>
            <li><a href="#">Profile</a></li>
            <li><a href="#">Notification</a></li>
            <li><a href="#">Account Setting</a></li>
            <li><a href="#">Language</a></li>
            <li><a href="#">Help</a></li>
            {isSignedIn && (
              <li><SignOutButton>Sign Out</SignOutButton></li>
            )}
          </ul>
          {isSignedIn && user && (
            <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem', color: '#555' }}>
              Signed in as <b>{user.primaryEmailAddress?.emailAddress}</b>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default BookingHeader;   // BookingPage.js
import React, { useEffect } from 'react';
import BookingHeader from './BookingHeader';
import SearchBar from './BookingSearchBar';
import GlobalAdventureCardSlider from './GlobalAdventureCardSlider';
import { FilterProvider, useFilter } from './FilterContext';
import { useLocation } from 'react-router-dom';
import { SignedIn, SignedOut, SignIn } from '@clerk/clerk-react';

function BookingPageContent() {
  const { setAddressSearch } = useFilter();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search') || '';
    setAddressSearch(search);
  }, [location.search, setAddressSearch]);

  return (
    <div>
      <BookingHeader />
      <SearchBar />
      <GlobalAdventureCardSlider />
    </div>
  );
}

function BookingPage() {
  return (
    <>
      <SignedIn>
        <FilterProvider>
          <BookingPageContent />
        </FilterProvider>
      </SignedIn>
      <SignedOut>
        <div>
          <SignIn />
        </div>
      </SignedOut>
    </>
  );
}

export default BookingPage;

 import { useFilter } from "./FilterContext";

export default function SearchBar() {
  const {
    addressSearch,
    setAddressSearch,
    activitySearch,
    setActivitySearch,
  } = useFilter();

  return (
    <div>
      {/* Where */}
      <div>
        <label>Where</label>
        <input
          type="text"
          placeholder="Search destinations"
          value={addressSearch}
          onChange={(e) => setAddressSearch(e.target.value)}
        />
      </div>

      {/* Activity */}
      <div>
        <label>Activity</label>
        <input
          type="text"
          placeholder="Search activities (e.g. Hiking, Diving)"
          value={activitySearch}
          onChange={(e) => setActivitySearch(e.target.value)}
        />
      </div>

      {/* Check in */}
      <div>
        <label>Check in</label>
        <input type="date" />
      </div>

      {/* Check out */}
      <div>
        <label>Check out</label>
        <input type="date" />
      </div>

      {/* Who */}
      <div>
        <label>Who</label>
        <input type="text" placeholder="Add guests" />
      </div>

      {/* Search Button */}
      <div>
        <button>
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1011 18.5a7.5 7.5 0 005.65-2.85z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
// src/context/FilterContext.js
import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [activeFilter, setActiveFilter] = useState(() => localStorage.getItem('adventureFilter') || "All");
  const [addressSearch, setAddressSearch] = useState("");
  const [activitySearch, setActivitySearch] = useState("");

  return (
    <FilterContext.Provider
      value={{ activeFilter, setActiveFilter, addressSearch, setAddressSearch, activitySearch, setActivitySearch }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  return useContext(FilterContext);
}
// Filters.js
export default function Filters({
  activeFilter,
  setActiveFilter,
  adventureTypes
}) {
  return (
    <div className="mb-8">
      {/* Type Filters */}
      <h3 className="text-lg font-semibold mb-4">Filter by Activity Type</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setActiveFilter("All")}
          className={`px-4 py-2 rounded-full text-sm font-medium ${activeFilter === "All" ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}
        >
          All
        </button>
        {adventureTypes.map((type) => (
          <button
            key={type}
            onClick={() => setActiveFilter(type)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${activeFilter === type ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
} 
// GlobalAdventureCardSlider.js
import { useState } from "react";
import { globalAdventureData, continents, adventureTypes } from "./data";
import Filters from "./Filters";
import AdventureSlider from "./AdventureSlider";
import AdventureGrid from "./AdventureGrid";

import { useFilter } from "./FilterContext"; // Import the context

export default function GlobalAdventureCardSlider() {
  const { activeFilter, setActiveFilter, addressSearch, activitySearch } = useFilter();

  // Load published adventures from localStorage
  let publishedAdventures = [];
  if (typeof window !== 'undefined') {
    try {
      publishedAdventures = JSON.parse(localStorage.getItem('publishedAdventures')) || [];
    } catch (e) {
      publishedAdventures = [];
    }
  }

  // Load latest onboarding adventure from onboardingData
  let onboardingAdventure = null;
  if (typeof window !== 'undefined') {
    try {
      const onboardingData = JSON.parse(localStorage.getItem('onboardingData'));
      if (onboardingData && onboardingData.step2 && onboardingData.step2.title && onboardingData.step1 && onboardingData.step1.location) {
        onboardingAdventure = {
          id: 'onboarding',
          title: onboardingData.step2.title,
          price: onboardingData.step8?.price || '',
          rating: 5.0,
          image: onboardingData.step5?.mainImage ? URL.createObjectURL(onboardingData.step5.mainImage) : 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
          location: onboardingData.step1.location,
          continent: onboardingData.step3?.continent || 'Unknown',
          type: onboardingData.step3?.category || 'Adventure',
          duration: onboardingData.step4?.duration || '',
          difficulty: 'Moderate',
          description: onboardingData.step2.description || '',
        };
      }
    } catch (e) { }
  }

  const allAdventures = [
    ...(onboardingAdventure ? [onboardingAdventure] : []),
    ...globalAdventureData,
    ...publishedAdventures
  ];

  const filteredAdventures = allAdventures.filter(item => {
    const typeMatch = activeFilter === "All" || item.type === activeFilter;
    const addressMatch = !addressSearch || item.location.toLowerCase().includes(addressSearch.toLowerCase());
    const activityMatch = !activitySearch || item.type.toLowerCase().includes(activitySearch.toLowerCase());
    return typeMatch && addressMatch && activityMatch;
  });

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with filters */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Global Adventure Experiences</h1>
          <p className="text-xl text-gray-600">Discover thrilling activities across the world</p>
        </div>

        <Filters
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          activeContinent={null} // Removed activeContinent prop
          setActiveContinent={null} // Removed setActiveContinent prop
          continents={continents}
          adventureTypes={adventureTypes}
        />

        <AdventureSlider
          adventures={filteredAdventures}
          title="Featured Adventures"
          viewAllLink={true}
        />

        <AdventureGrid
          adventures={filteredAdventures}
          title="All Adventures"
          showCount={true}
        />

        
      </div>
    </div>
  );
} 
import { SignIn } from '@clerk/clerk-react';

export default function Login() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <SignIn />
      </div>
    </div>
  );
}
// ReviewPayment.js
import { useLocation } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import './ReviewPayment.css';

export default function ReviewPayment() {
  const { state } = useLocation();
  const { adventure, certification, totalPrice } = state || {};
  const { user } = useUser();

  if (!adventure) {
    return <div className="no-adventure">No adventure selected</div>;
  }

  return (
    <div className="review-payment-container">
      <div className="review-card">
        <h2 className="review-title">Review Your Booking</h2>
        <div className="review-details">
          <div className="detail-item">
            <span className="label">Adventure:</span>
            <span className="value">{adventure.title}</span>
          </div>
          <div className="detail-item">
            <span className="label">Price:</span>
            <span className="value">${adventure.price}</span>
          </div>
          {certification && (
            <div className="detail-item">
              <span className="label">Certification:</span>
              <span className="value">{certification.name} (+${certification.price})</span>
            </div>
          )}
          <div className="detail-item total">
            <span className="label">Total:</span>
            <span className="value">${totalPrice}</span>
          </div>
          <div className="detail-item">
            <span className="label">Booking as:</span>
            <span className="value">{user?.primaryEmailAddress?.emailAddress}</span>
          </div>
        </div>
        <button className="payment-button">Proceed to Payment</button>
      </div>
    </div>
  );
}  want thing  i  enhace  in  which it  is basically a  booking   folder  page  code  in airnb  if  you  want  any  suggestion  then please  give  me   